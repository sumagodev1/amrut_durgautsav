"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { DISTRICTS, ALL_DISTRICTS } from "@/data/districts";
import { UI } from "@/data/ui";
import { t, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/**
 * District filter for the gallery.
 *
 * The selection lives in the URL, not in component state — so a filtered
 * view is shareable, survives a reload, and is rendered on the server. The
 * control is a real radio group, which gives keyboard users arrow-key
 * navigation for free.
 */
export function DistrictFilter({
  locale,
  selected,
}: {
  locale: Locale;
  selected: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [pending, startTransition] = useTransition();

  function select(district: string) {
    const params = new URLSearchParams(searchParams?.toString());
    if (district === ALL_DISTRICTS) params.delete("district");
    else params.set("district", district);
    params.delete("page");

    const query = params.toString();
    startTransition(() => {
      router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
    });
  }

  const options = [
    { id: ALL_DISTRICTS, label: UI.allDistricts },
    ...DISTRICTS.map((d) => ({ id: d.id, label: d.label })),
  ];

  return (
    <div
      role="radiogroup"
      aria-label={t(UI.selectDistrict, locale)}
      aria-busy={pending}
      className={cn(
        "flex flex-wrap gap-2 transition-opacity duration-300",
        pending && "opacity-60",
      )}
    >
      {options.map((option) => {
        const active = option.id === selected;
        return (
          <button
            key={option.id}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => select(option.id)}
            data-cursor="link"
            className={cn(
              "rounded-[2px] border px-3.5 py-2 text-[0.9375rem] transition-colors duration-300",
              locale === "mr" && "font-[family-name:var(--font-devanagari)]",
              active
                ? "border-[var(--primary)] bg-[var(--primary)] text-[var(--primary-contrast)]"
                : "border-[var(--border)] text-[var(--muted)] hover:border-[var(--accent)] hover:text-[var(--foreground)]",
            )}
          >
            {t(option.label, locale)}
          </button>
        );
      })}
    </div>
  );
}
