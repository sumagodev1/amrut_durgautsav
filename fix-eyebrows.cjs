const fs = require("fs");

let misses = 0;
function edit(p, pairs) {
  let s = fs.readFileSync(p, "utf8");
  for (const [a, b] of pairs) {
    if (!s.includes(a)) {
      console.log("MISS", p, "::", a.slice(0, 90).replace(/\n/g, "\\n"));
      misses++;
      continue;
    }
    s = s.split(a).join(b);
  }
  fs.writeFileSync(p, s);
}

function ensureImport(p, names) {
  let s = fs.readFileSync(p, "utf8");
  const re = /import \{([^}]*)\} from "@\/lib\/utils";/;
  const m = s.match(re);
  if (m) {
    const have = m[1].split(",").map((x) => x.trim()).filter(Boolean);
    for (const n of names) if (!have.includes(n)) have.push(n);
    s = s.replace(re, `import { ${have.join(", ")} } from "@/lib/utils";`);
  } else {
    // Insert after the last import line.
    const lines = s.split("\n");
    let last = 0;
    lines.forEach((l, i) => {
      if (/^import /.test(l)) last = i;
    });
    lines.splice(last + 1, 0, `import { ${names.join(", ")} } from "@/lib/utils";`);
    s = lines.join("\n");
  }
  fs.writeFileSync(p, s);
}

/* --- Logo -------------------------------------------------------------- */
ensureImport("src/components/layout/Logo.tsx", ["eyebrowClass", "cn"]);
edit("src/components/layout/Logo.tsx", [
  [
    `          <span className="text-eyebrow mt-1 text-[0.5625rem] text-[var(--muted)]">
            {t(SITE.parentBrand, locale)}
          </span>`,
    `          <span
            className={cn(
              eyebrowClass(t(SITE.parentBrand, locale)),
              "mt-1 text-[0.5625rem] text-[var(--muted)]",
            )}
          >
            {t(SITE.parentBrand, locale)}
          </span>`,
  ],
]);

/* --- Hero --------------------------------------------------------------- */
ensureImport("src/components/hero/Hero.tsx", ["cn", "eyebrowClass"]);
edit("src/components/hero/Hero.tsx", [
  [
    `          <p className="text-eyebrow hidden text-[color-mix(in_srgb,var(--color-paper-200)_70%,transparent)] sm:block">
            {t(UI.unescoLabel, locale)}`,
    `          <p
            className={cn(
              eyebrowClass(t(UI.unescoLabel, locale)),
              "hidden text-[color-mix(in_srgb,var(--color-paper-200)_70%,transparent)] sm:block",
            )}
          >
            {t(UI.unescoLabel, locale)}`,
  ],
  [
    `            <span className="text-eyebrow">{t(UI.scroll, locale)}</span>`,
    `            <span className={eyebrowClass(t(UI.scroll, locale))}>
              {t(UI.scroll, locale)}
            </span>`,
  ],
  [
    `          <p className="text-eyebrow hidden text-[color-mix(in_srgb,var(--color-paper-200)_70%,transparent)] lg:block">
            {t(SITE.organisationShort, locale)}
          </p>`,
    `          <p
            className={cn(
              eyebrowClass(t(SITE.organisationShort, locale)),
              "hidden text-[color-mix(in_srgb,var(--color-paper-200)_70%,transparent)] lg:block",
            )}
          >
            {t(SITE.organisationShort, locale)}
          </p>`,
  ],
]);

/* --- HeroTitle ---------------------------------------------------------- */
ensureImport("src/components/hero/HeroTitle.tsx", ["cn", "eyebrowClass"]);
edit("src/components/hero/HeroTitle.tsx", [
  [
    `        className="text-eyebrow flex items-center gap-3 text-[var(--color-gold-300)]"`,
    `        className={cn(
          eyebrowClass(t(HERO.eyebrow, locale)),
          "flex items-center gap-3 text-[var(--color-gold-300)]",
        )}`,
  ],
  [
    `            className="text-eyebrow hidden shrink-0 text-[color-mix(in_srgb,var(--color-paper-200)_72%,transparent)] sm:block"`,
    `            className={cn(
              locale === "mr" ? "text-eyebrow-mr" : "text-eyebrow",
              "hidden shrink-0 text-[color-mix(in_srgb,var(--color-paper-200)_72%,transparent)] sm:block",
            )}`,
  ],
]);

/* --- Footer ------------------------------------------------------------- */
ensureImport("src/components/layout/Footer.tsx", ["cn", "eyebrowClass"]);
edit("src/components/layout/Footer.tsx", [
  [
    `                <span className="text-eyebrow mt-1.5 text-[0.5625rem] text-[var(--muted)]">
                  {t(SITE.parentBrand, locale)}
                </span>`,
    `                <span
                  className={cn(
                    eyebrowClass(t(SITE.parentBrand, locale)),
                    "mt-1.5 text-[0.5625rem] text-[var(--muted)]",
                  )}
                >
                  {t(SITE.parentBrand, locale)}
                </span>`,
  ],
  [
    `            <h2 className="text-eyebrow text-[var(--accent)]">{t(UI.quickLinks, locale)}</h2>`,
    `            <h2 className={cn(eyebrowClass(t(UI.quickLinks, locale)), "text-[var(--accent)]")}>
              {t(UI.quickLinks, locale)}
            </h2>`,
  ],
  [
    `            <h2 className="text-eyebrow text-[var(--accent)]">{t(UI.contactHeading, locale)}</h2>`,
    `            <h2
              className={cn(eyebrowClass(t(UI.contactHeading, locale)), "text-[var(--accent)]")}
            >
              {t(UI.contactHeading, locale)}
            </h2>`,
  ],
]);

/* --- MobileMenu --------------------------------------------------------- */
ensureImport("src/components/layout/MobileMenu.tsx", ["cn", "eyebrowClass"]);
edit("src/components/layout/MobileMenu.tsx", [
  [
    `            <span className="text-eyebrow text-[var(--muted)]">{t(UI.menu, locale)}</span>`,
    `            <span className={cn(eyebrowClass(t(UI.menu, locale)), "text-[var(--muted)]")}>
              {t(UI.menu, locale)}
            </span>`,
  ],
  [
    `                      <span className="text-eyebrow w-7 shrink-0 text-[var(--accent)] opacity-70">`,
    `                      <span className="text-eyebrow w-7 shrink-0 text-[var(--accent)] opacity-70 tabular-nums">`,
  ],
]);

/* --- FortsIndex --------------------------------------------------------- */
ensureImport("src/components/sections/FortsIndex.tsx", ["cn", "localeHref", "eyebrowClass"]);
edit("src/components/sections/FortsIndex.tsx", [
  [
    `                    <p className="text-eyebrow text-[var(--accent)]">
                      {t(TYPOLOGY_LABEL[active.typology], locale)}
                    </p>`,
    `                    <p
                      className={cn(
                        eyebrowClass(t(TYPOLOGY_LABEL[active.typology], locale)),
                        "text-[var(--accent)]",
                      )}
                    >
                      {t(TYPOLOGY_LABEL[active.typology], locale)}
                    </p>`,
  ],
]);

/* --- Forts index page --------------------------------------------------- */
ensureImport("src/app/[locale]/forts/page.tsx", ["localeHref", "cn", "eyebrowClass"]);
edit("src/app/[locale]/forts/page.tsx", [
  [
    `                      <span className="text-eyebrow absolute top-4 right-5 text-[var(--muted)]">
                        {t(TYPOLOGY_LABEL[fort.typology], locale)}
                      </span>`,
    `                      <span
                        className={cn(
                          eyebrowClass(t(TYPOLOGY_LABEL[fort.typology], locale)),
                          "absolute top-4 right-5 text-[var(--muted)]",
                        )}
                      >
                        {t(TYPOLOGY_LABEL[fort.typology], locale)}
                      </span>`,
  ],
]);

/* --- Fort detail page --------------------------------------------------- */
ensureImport("src/app/[locale]/forts/[slug]/page.tsx", ["localeHref", "cn", "eyebrowClass"]);
edit("src/app/[locale]/forts/[slug]/page.tsx", [
  [
    `                  <h2 className="text-eyebrow text-[var(--accent)]">
                    {locale === "mr" ? "नोंदी" : "On record"}
                  </h2>`,
    `                  <h2
                    className={cn(
                      locale === "mr" ? "text-eyebrow-mr" : "text-eyebrow",
                      "text-[var(--accent)]",
                    )}
                  >
                    {locale === "mr" ? "नोंदी" : "On record"}
                  </h2>`,
  ],
  [
    `      <dt className="text-eyebrow text-[var(--muted)]">{label}</dt>`,
    `      <dt className={cn(eyebrowClass(label), "text-[var(--muted)]")}>{label}</dt>`,
  ],
]);

/* --- Gallery page ------------------------------------------------------- */
ensureImport("src/app/[locale]/gallery/page.tsx", ["localeHref", "cn", "eyebrowClass"]);
edit("src/app/[locale]/gallery/page.tsx", [
  [
    `            <h2 className="text-eyebrow text-[var(--accent)]">
              {t(UI.selectDistrict, locale)}
            </h2>`,
    `            <h2
              className={cn(eyebrowClass(t(UI.selectDistrict, locale)), "text-[var(--accent)]")}
            >
              {t(UI.selectDistrict, locale)}
            </h2>`,
  ],
]);

/* --- Participate page --------------------------------------------------- */
ensureImport("src/app/[locale]/participate/page.tsx", ["cn", "eyebrowClass"]);
edit("src/app/[locale]/participate/page.tsx", [
  [
    `                    <p className="text-eyebrow text-[var(--accent)]">
                      {t(REGISTRATION_NOTICE.title, locale)}
                    </p>`,
    `                    <p
                      className={cn(
                        eyebrowClass(t(REGISTRATION_NOTICE.title, locale)),
                        "text-[var(--accent)]",
                      )}
                    >
                      {t(REGISTRATION_NOTICE.title, locale)}
                    </p>`,
  ],
]);

/* --- Contact page ------------------------------------------------------- */
ensureImport("src/app/[locale]/contact/page.tsx", ["cn", "eyebrowClass"]);
edit("src/app/[locale]/contact/page.tsx", [
  [
    `                            <span className="text-eyebrow block text-[var(--muted)]">
                              {channel.label}
                            </span>`,
    `                            <span
                              className={cn(
                                eyebrowClass(channel.label),
                                "block text-[var(--muted)]",
                              )}
                            >
                              {channel.label}
                            </span>`,
  ],
  [
    `                    <h2 className="text-eyebrow mt-5 text-[var(--muted)]">
                      {t(UI.addressLabel, locale)}
                    </h2>`,
    `                    <h2
                      className={cn(
                        eyebrowClass(t(UI.addressLabel, locale)),
                        "mt-5 text-[var(--muted)]",
                      )}
                    >
                      {t(UI.addressLabel, locale)}
                    </h2>`,
  ],
]);

/* --- Loading screen / notice / lightbox / grid -------------------------- */
ensureImport("src/components/layout/LoadingScreen.tsx", ["cn", "eyebrowClass"]);
edit("src/components/layout/LoadingScreen.tsx", [
  [
    `              className="text-eyebrow mt-3 text-[var(--muted)]"`,
    `              className={cn(eyebrowClass(t(SITE.parentBrand, locale)), "mt-3 text-[var(--muted)]")}`,
  ],
]);

ensureImport("src/components/sections/RegistrationNotice.tsx", ["cn", "eyebrowClass"]);
edit("src/components/sections/RegistrationNotice.tsx", [
  [
    `              <p className="text-eyebrow text-[var(--color-gold-300)]">
                {t(REGISTRATION_NOTICE.title, locale)}
              </p>`,
    `              <p
                className={cn(
                  eyebrowClass(t(REGISTRATION_NOTICE.title, locale)),
                  "text-[var(--color-gold-300)]",
                )}
              >
                {t(REGISTRATION_NOTICE.title, locale)}
              </p>`,
  ],
]);

ensureImport("src/components/gallery/Lightbox.tsx", ["cn", "eyebrowClass"]);
edit("src/components/gallery/Lightbox.tsx", [
  [
    `                <p className="text-eyebrow mt-1.5 text-[var(--color-paper-400)]">
                  {photo.district}
                </p>`,
    `                <p
                  className={cn(
                    eyebrowClass(photo.district),
                    "mt-1.5 text-[var(--color-paper-400)]",
                  )}
                >
                  {photo.district}
                </p>`,
  ],
]);

edit("src/components/gallery/PhotoGrid.tsx", [
  [
    `                    className="text-eyebrow pointer-events-none absolute bottom-0 left-0 translate-y-2 p-4 text-[var(--color-paper-100)] opacity-0 transition-all duration-500 ease-[var(--ease-out-expo)] group-hover:translate-y-0 group-hover:opacity-100"`,
    `                    className={cn(
                      eyebrowClass(photo.district),
                      "pointer-events-none absolute bottom-0 left-0 translate-y-2 p-4 text-[var(--color-paper-100)] opacity-0 transition-all duration-500 ease-[var(--ease-out-expo)] group-hover:translate-y-0 group-hover:opacity-100",
                    )}`,
  ],
]);
ensureImport("src/components/gallery/PhotoGrid.tsx", ["cn", "eyebrowClass"]);

/* --- Album page --------------------------------------------------------- */
console.log(misses === 0 ? "\nAll replacements applied." : `\n${misses} miss(es) — review above.`);
