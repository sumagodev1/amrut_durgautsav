/**
 * Data-access boundary.
 *
 * Everything the UI needs that is NOT static content comes through here:
 * gallery photographs, the world-record album, and the live participation
 * count. The UI imports these functions and nothing else — it never knows a
 * URL, a response shape or a transport.
 *
 * That makes the swap to Sanity / Strapi / a GraphQL gateway a change to this
 * one file. The endpoints below are the ones the current durgotsav platform
 * serves; override them with environment variables per deployment.
 *
 * Every function fails soft. A gallery that cannot be reached renders its
 * empty state; it never takes a page down.
 */

const GALLERY_API =
  process.env.NEXT_PUBLIC_GALLERY_API ?? "https://durgotsav.imperative.co.in/gallery-images";
const ALBUM_API = process.env.NEXT_PUBLIC_ALBUM_API ?? "https://admin.durgotsav.com/images";
const STATS_API =
  process.env.NEXT_PUBLIC_STATS_API ?? "https://durgotsav.imperative.co.in/admin-stats";

/** How long a successful response may be reused before refetching. */
const REVALIDATE_SECONDS = 300;

export type Photo = {
  id: string;
  url: string;
  /** District the photo was submitted from, where the platform records one. */
  district?: string;
  caption?: string;
  width?: number;
  height?: number;
};

export type PhotoPage = {
  photos: Photo[];
  page: number;
  totalPages: number;
  total: number;
  /** True when the upstream platform could not be reached. */
  unavailable?: boolean;
};

export type ParticipationStats = {
  participants: number | null;
  unavailable?: boolean;
};

const EMPTY_PAGE: PhotoPage = {
  photos: [],
  page: 1,
  totalPages: 1,
  total: 0,
  unavailable: true,
};

async function getJson(url: string, revalidate = REVALIDATE_SECONDS): Promise<unknown | null> {
  try {
    const res = await fetch(url, {
      headers: { Accept: "application/json" },
      next: { revalidate },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return null;
    return (await res.json()) as unknown;
  } catch {
    // Upstream unreachable, slow, or returning something that isn't JSON.
    // Callers render their empty state.
    return null;
  }
}

/* -------------------------------------------------------------------------
 * Normalisation
 *
 * The upstream services are not under our control and have returned both
 * bare arrays and `{ data: [...] }` envelopes. These helpers accept either
 * rather than assuming a shape that may change.
 * ---------------------------------------------------------------------- */

function asRecord(value: unknown): Record<string, unknown> | null {
  return typeof value === "object" && value !== null ? (value as Record<string, unknown>) : null;
}

function pickArray(payload: unknown): unknown[] {
  if (Array.isArray(payload)) return payload;
  const obj = asRecord(payload);
  if (!obj) return [];
  for (const key of ["images", "data", "results", "items", "photos"]) {
    const candidate = obj[key];
    if (Array.isArray(candidate)) return candidate;
  }
  return [];
}

function pickString(obj: Record<string, unknown>, keys: string[]): string | undefined {
  for (const key of keys) {
    const v = obj[key];
    if (typeof v === "string" && v.trim()) return v.trim();
  }
  return undefined;
}

function pickNumber(payload: unknown, keys: string[]): number | undefined {
  const obj = asRecord(payload);
  if (!obj) return undefined;
  for (const key of keys) {
    const v = obj[key];
    if (typeof v === "number" && Number.isFinite(v)) return v;
    if (typeof v === "string" && v.trim() !== "" && Number.isFinite(Number(v))) return Number(v);
  }
  return undefined;
}

function toPhoto(raw: unknown, index: number): Photo | null {
  const obj = asRecord(raw);
  if (!obj) {
    // Some endpoints return a plain array of URL strings.
    if (typeof raw === "string" && raw.trim()) {
      return { id: `photo-${index}`, url: raw.trim() };
    }
    return null;
  }
  const url = pickString(obj, ["url", "imageUrl", "image_url", "image", "src", "path"]);
  if (!url) return null;
  return {
    id: pickString(obj, ["id", "_id", "uuid"]) ?? `photo-${index}`,
    url,
    district: pickString(obj, ["district", "jilha", "city"]),
    caption: pickString(obj, ["caption", "title", "name"]),
    width: pickNumber(obj, ["width"]),
    height: pickNumber(obj, ["height"]),
  };
}

function toPhotoPage(payload: unknown, page: number): PhotoPage {
  const photos = pickArray(payload)
    .map(toPhoto)
    .filter((p): p is Photo => p !== null);

  const total = pickNumber(payload, ["total", "totalCount", "count"]) ?? photos.length;
  const totalPages = pickNumber(payload, ["totalPages", "pages", "lastPage"]) ?? 1;

  return { photos, page, total, totalPages: Math.max(1, totalPages) };
}

/* -------------------------------------------------------------------------
 * Public API
 * ---------------------------------------------------------------------- */

/**
 * Gallery photographs, optionally narrowed to one district.
 * `district` is the Marathi district name, which is what the platform stores.
 */
export async function getGalleryPhotos(options: {
  district?: string;
  page?: number;
} = {}): Promise<PhotoPage> {
  const page = Math.max(1, options.page ?? 1);
  const url = new URL(GALLERY_API);
  url.searchParams.set("page", String(page));
  if (options.district) url.searchParams.set("district", options.district);

  const payload = await getJson(url.toString());
  if (payload === null) return { ...EMPTY_PAGE, page };
  return toPhotoPage(payload, page);
}

/** The world-record photo album. */
export async function getAlbumPhotos(page = 1): Promise<PhotoPage> {
  const url = new URL(ALBUM_API);
  url.searchParams.set("page", String(Math.max(1, page)));

  const payload = await getJson(url.toString());
  if (payload === null) return { ...EMPTY_PAGE, page };
  return toPhotoPage(payload, page);
}

/**
 * Live participation count for the progress band.
 *
 * Returns `participants: null` when the figure is unavailable. Callers must
 * render that honestly — we never show an invented or placeholder number.
 */
export async function getParticipationStats(): Promise<ParticipationStats> {
  const payload = await getJson(STATS_API, 60);
  if (payload === null) return { participants: null, unavailable: true };

  const participants =
    pickNumber(payload, ["participants", "totalParticipants", "registrations", "total", "count"]) ??
    pickNumber(asRecord(payload)?.data, [
      "participants",
      "totalParticipants",
      "registrations",
      "total",
      "count",
    ]);

  if (participants === undefined) return { participants: null, unavailable: true };
  return { participants };
}
