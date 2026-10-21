import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { TABS, type Press, type Section } from "@/components/binder/content";
import { slugify } from "@/lib/slug";
import { PhotoGallery } from "./PhotoGallery";

const CONTACT_LINKS = [
  { label: "Email", href: "mailto:japhbkk@gmail.com" },
  { label: "Instagram", href: "https://www.instagram.com/livlitwithjaan/" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/janyaph/" },
  { label: "Resume", href: "/Janya-Resume.pdf?v=2" },
];

function PressCard({ press }: { press: Press }) {
  return (
    <a
      href={press.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group/press mt-6 block rounded-2xl border border-ink/15 bg-card px-6 py-5 transition-colors hover:border-gold hover:bg-secondary"
    >
      <div className="flex items-center justify-between gap-4">
        <span className="text-[10px] uppercase tracking-[0.22em] text-foreground/50">
          As featured in · {press.outlet} · {press.date}
        </span>
        <ArrowUpRight className="h-4 w-4 shrink-0 text-foreground/40 transition-all group-hover/press:-translate-y-0.5 group-hover/press:translate-x-0.5 group-hover/press:text-gold" />
      </div>
      <p className="mt-2 font-serif-display text-xl leading-snug">{press.headline}</p>
      {press.quote && (
        <p className="mt-3 font-serif-display italic text-foreground/65">
          &ldquo;{press.quote}&rdquo;
        </p>
      )}
    </a>
  );
}

export function DetailPage({
  segments,
  navigate,
}: {
  segments: string[];
  navigate: (to: string) => void;
}) {
  const [first, second] = segments;
  const tabId = first === "about" ? "core" : first;
  const tab = TABS.find((t) => t.id === tabId);

  const section: Section | undefined = second
    ? tab?.sections.find((s) => slugify(s.heading) === second)
    : undefined;

  if (!tab || (second && !section)) {
    return (
      <div className="relative mx-auto max-w-2xl px-4 py-24 text-center sm:px-10">
        <p className="font-serif-display text-3xl">That page wandered off.</p>
        <button
          type="button"
          onClick={() => navigate("/")}
          className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-foreground hover:underline"
        >
          <ArrowLeft className="h-4 w-4" /> Back home
        </button>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden px-4 py-14 sm:px-10 sm:py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-gold-soft/35 blur-3xl"
      />

      <div className="relative mx-auto max-w-3xl">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-foreground/50 transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back home
        </button>

        {section ? (
          <article className="mt-8">
            <p className="text-[11px] uppercase tracking-[0.28em] text-foreground/45">
              {tab.label}
              {section.meta ? ` · ${section.meta}` : ""}
            </p>
            <h1 className="mt-3 text-balance font-serif-display text-4xl font-medium leading-tight sm:text-5xl">
              {section.heading}
            </h1>
            {section.photos && <PhotoGallery photos={section.photos} className="mt-8" />}
            {section.body && (
              <p className="mt-6 max-w-2xl font-serif-display text-xl italic leading-[1.7] text-muted-foreground">
                {section.body}
              </p>
            )}
            {section.press?.map((p) => (
              <PressCard key={p.url} press={p} />
            ))}
            {section.items && (
              <ul className="mt-10 grid gap-x-10 gap-y-1 border-t border-dashed border-ink/15 pt-8 sm:grid-cols-2">
                {section.items.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 border-b border-dashed border-ink/15 py-3 leading-relaxed text-foreground/75"
                  >
                    <span className="mt-2.5 h-1 w-1 shrink-0 rotate-45 bg-gold" />
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </article>
        ) : (
          <article className="mt-8">
            <p className="text-[11px] uppercase tracking-[0.28em] text-foreground/45">
              {tab.kicker}
            </p>
            <h1 className="mt-3 text-balance font-serif-display text-4xl font-medium leading-tight sm:text-5xl">
              {tab.title}
            </h1>
            {tab.intro && (
              <p className="mt-6 max-w-2xl font-serif-display text-xl italic leading-relaxed text-muted-foreground">
                {tab.intro}
              </p>
            )}
            {tab.photos && (
              <PhotoGallery
                photos={tab.photos}
                aspect="aspect-[4/5]"
                className="mx-auto mt-10 max-w-md"
              />
            )}

            {tab.id === "contact" ? (
              <div className="mt-10 grid gap-3 sm:grid-cols-2">
                {CONTACT_LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="group/link flex items-center justify-between rounded-xl border border-ink/15 bg-card px-5 py-4 transition-colors hover:border-gold hover:bg-secondary"
                  >
                    <span className="text-sm font-medium tracking-wide">{link.label}</span>
                    <ArrowUpRight className="h-4 w-4 text-foreground/40 transition-all group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 group-hover/link:text-gold" />
                  </a>
                ))}
              </div>
            ) : (
              <div className="mt-12 space-y-12">
                {tab.sections.map((s) => (
                  <div key={s.heading} className="border-t border-dashed border-ink/15 pt-8">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h2 className="font-serif-display text-2xl">{s.heading}</h2>
                      {s.meta && (
                        <span className="text-[10px] uppercase tracking-[0.22em] text-foreground/45">
                          {s.meta}
                        </span>
                      )}
                    </div>
                    {s.photos && <PhotoGallery photos={s.photos} className="mt-5" />}
                    {s.mentions && (
                      <p className="mt-4 max-w-2xl leading-[1.8] text-foreground/75">
                        Featured in{" "}
                        {s.mentions.map((m, i) => (
                          <span key={m.label}>
                            {i > 0 && " · "}
                            {m.url ? (
                              <a
                                href={m.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline decoration-gold/60 underline-offset-4 transition-colors hover:text-foreground hover:decoration-gold"
                              >
                                {m.label}
                              </a>
                            ) : (
                              m.label
                            )}
                          </span>
                        ))}
                        .
                      </p>
                    )}
                    {s.body && (
                      <p className="mt-4 max-w-2xl leading-[1.8] text-foreground/75">{s.body}</p>
                    )}
                    {s.press?.map((p) => (
                      <PressCard key={p.url} press={p} />
                    ))}
                    {s.items &&
                      (s.heading === "At a glance" ? (
                        <dl className="mt-6 grid gap-x-10 gap-y-5 sm:grid-cols-2">
                          {s.items.map((item) => {
                            const [label, value] = item.split(" — ");
                            return (
                              <div key={item} className="border-b border-dashed border-ink/15 pb-4">
                                <dt className="text-[10px] uppercase tracking-[0.2em] text-foreground/45">
                                  {label}
                                </dt>
                                <dd className="mt-1.5 font-serif-display text-lg">{value}</dd>
                              </div>
                            );
                          })}
                        </dl>
                      ) : (
                        <ul className="mt-5 grid gap-x-10 sm:grid-cols-2">
                          {s.items.map((item) => (
                            <li
                              key={item}
                              className="flex gap-3 border-b border-dashed border-ink/15 py-2.5 text-sm leading-relaxed text-foreground/75 transition-colors hover:text-foreground"
                            >
                              <span className="mt-2 h-1 w-1 shrink-0 rotate-45 bg-gold" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      ))}
                  </div>
                ))}
              </div>
            )}
          </article>
        )}
      </div>
    </div>
  );
}
