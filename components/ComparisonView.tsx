import Link from "next/link";
import { countSupport, decodeCells } from "@/lib/compare";
import type {
  CompareApp,
  FormatBand,
  LocalizedComparison,
  Support,
} from "@/lib/compare";
import type { Translations } from "@/lib/i18n";
import type { ReleaseData } from "@/lib/release";
import DownloadCard from "@/components/DownloadCard";
import RichText from "@/components/RichText";

type Copy = LocalizedComparison["copy"];

export interface ComparisonLink {
  href: string;
  label: string;
}

/**
 * The comparison page body, shared by the five-app hub and the head-to-head
 * pages. Everything below the masthead is driven by `data`, so a narrowed
 * two-app comparison renders through exactly the same table code.
 */
export default function ComparisonView({
  data,
  headline,
  deck,
  t,
  release,
  links,
}: {
  data: LocalizedComparison;
  headline: string;
  deck: string;
  t: Translations;
  release: ReleaseData;
  links?: ComparisonLink[];
}) {
  const { copy, apps, bands, capabilities, footnotes } = data;
  const formatCount = bands.reduce((n, b) => n + b.rows.length, 0);
  const pair = apps.length === 2;

  // 52px per read/write column + the sticky format column.
  const matrixMin = apps.length * 104 + 220;

  return (
    <main className="max-w-[1120px] mx-auto px-6 max-md:px-5">
      {/* ─── MASTHEAD ─── */}
      <section className="py-16 max-md:py-12">
        <p className="font-mono text-[11px] tracking-[0.08em] text-ink-tertiary uppercase mb-2">
          {copy.eyebrow}
        </p>
        <h1
          className="font-medium leading-[1.1] tracking-[-0.025em] text-ink-primary mb-5 max-w-[16ch]"
          style={{ fontSize: "clamp(32px, 4.5vw, 48px)" }}
        >
          {headline}
        </h1>
        <p className="text-[16px] leading-[1.6] text-ink-secondary max-w-[62ch] mb-6">
          {deck}
        </p>
        <div className="flex flex-wrap gap-x-6 gap-y-1.5 font-mono text-[11px] text-ink-tertiary">
          <span>{copy.metaDate}</span>
          <span>
            {formatCount} {copy.scope.formats} · {capabilities.length}{" "}
            {copy.scope.capabilities}
          </span>
        </div>
      </section>

      {/* ─── THE APPS ─── */}
      <section className="mb-12">
        <SectionTitle>{copy.sections.contenders}</SectionTitle>
        <div
          className={`grid gap-3 ${
            pair
              ? "grid-cols-1 sm:grid-cols-2 max-w-[520px]"
              : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
          }`}
        >
          {apps.map((app, i) => (
            <ContenderCard
              key={app.id}
              app={app}
              copy={copy}
              totals={countSupport(bands, i)}
            />
          ))}
        </div>
        <p className="text-[13px] leading-[1.6] text-ink-secondary max-w-[78ch] mt-4">
          <RichText text={copy.method} />
        </p>
      </section>

      {/* ─── FORMAT MATRIX ─── */}
      <section className="mb-12">
        <SectionTitle>{copy.sections.matrix}</SectionTitle>
        <p className="text-[14px] leading-[1.6] text-ink-secondary max-w-[70ch] mb-4">
          <RichText text={pair ? copy.matrixIntroPair : copy.matrixIntro} />
        </p>

        <div
          tabIndex={0}
          role="region"
          aria-label={copy.sections.matrix}
          className="overflow-x-auto bg-bg-surface border-[0.5px] border-border-default rounded-md"
        >
          <table
            className="w-full border-collapse text-[13px]"
            style={{ minWidth: `${matrixMin}px` }}
          >
            <thead>
              <tr>
                <th
                  rowSpan={2}
                  scope="col"
                  className="sticky left-0 z-[3] bg-bg-muted text-left align-bottom font-medium text-ink-primary text-[12px] px-3.5 py-2.5 min-w-[220px] border-b-[0.5px] border-border-strong"
                >
                  {copy.columns.format}
                </th>
                {apps.map((app) => (
                  <th
                    key={app.id}
                    colSpan={2}
                    scope="colgroup"
                    className="bg-bg-muted text-center font-medium text-ink-primary text-[12px] px-2 pt-2.5 pb-1 whitespace-nowrap border-l-[0.5px] border-border-default"
                  >
                    {app.name}
                  </th>
                ))}
              </tr>
              <tr>
                {apps.flatMap((app) =>
                  (
                    [
                      ["read", copy.columns.read],
                      ["write", copy.columns.write],
                    ] as [Tone, string][]
                  ).map(([tone, label]) => (
                    <th
                      key={`${app.id}-${tone}`}
                      scope="col"
                      className={`bg-bg-muted text-center font-mono font-normal text-[10px] tracking-[0.06em] uppercase px-1 pb-2 w-[52px] border-b-[0.5px] border-border-strong ${TONE[tone].ink} ${
                        tone === "read" ? "border-l-[0.5px] border-l-border-default" : ""
                      }`}
                    >
                      {label}
                    </th>
                  )),
                )}
              </tr>
            </thead>
            <tbody>
              {bands.map((band) => (
                <BandGroup key={band.id} band={band} apps={apps} copy={copy} />
              ))}
            </tbody>
          </table>
        </div>

        <Legend copy={copy} tones />
      </section>

      {/* ─── CAPABILITIES ─── */}
      <section className="mb-12">
        <SectionTitle>{copy.sections.capabilities}</SectionTitle>
        <p className="text-[14px] leading-[1.6] text-ink-secondary max-w-[70ch] mb-4">
          {copy.capsIntro}
        </p>

        <div
          tabIndex={0}
          role="region"
          aria-label={copy.sections.capabilities}
          className="overflow-x-auto bg-bg-surface border-[0.5px] border-border-default rounded-md"
        >
          <table
            className="w-full border-collapse text-[13px]"
            style={{ minWidth: `${apps.length * 96 + 300}px` }}
          >
            <thead>
              <tr>
                <th
                  scope="col"
                  className="sticky left-0 z-[3] bg-bg-muted text-left font-medium text-ink-primary text-[12px] px-3.5 py-2.5 min-w-[300px] border-b-[0.5px] border-border-strong"
                >
                  {copy.columns.capability}
                </th>
                {apps.map((app) => (
                  <th
                    key={app.id}
                    scope="col"
                    className="bg-bg-muted text-center font-medium text-ink-primary text-[12px] px-2 py-2.5 whitespace-nowrap w-[96px] border-l-[0.5px] border-border-default border-b-[0.5px] border-b-border-strong"
                  >
                    {app.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {capabilities.map((row) => {
                const states = decodeCells(row.cells);
                return (
                  <tr key={row.id} className="group">
                    <th
                      scope="row"
                      className="sticky left-0 z-[1] bg-bg-surface text-left font-medium text-ink-primary align-top px-3.5 py-2.5 border-b-[0.5px] border-border-subtle border-r-[0.5px] border-r-border-default"
                    >
                      {row.label}
                      <span className="block font-normal text-[12px] leading-[1.5] text-ink-tertiary mt-0.5">
                        {row.note}
                      </span>
                    </th>
                    {states.map((state, i) => (
                      <Cell
                        key={apps[i].id}
                        state={state}
                        tone="read"
                        copy={copy}
                        note={row.fn?.[i]}
                        title={`${apps[i].name}: ${copy.legend[state]}`}
                      />
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <Legend copy={copy} />
      </section>

      {/* ─── NOTES ─── */}
      {footnotes.length > 0 && (
        <section className="mb-12">
          <SectionTitle>{copy.sections.notes}</SectionTitle>
          <ol className="list-none p-0 m-0 flex flex-col gap-2 max-w-[86ch]">
            {footnotes.map((note, i) => (
              <li
                key={i}
                id={`fn-${i + 1}`}
                className="flex gap-3 text-[13px] leading-[1.6] text-ink-secondary scroll-mt-20 target:bg-bg-muted target:rounded-sm"
              >
                <span className="font-mono text-[11px] text-ink-tertiary pt-[3px] min-w-[16px]">
                  {i + 1}
                </span>
                <span>
                  <RichText text={note} />
                </span>
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* ─── MORE COMPARISONS ─── */}
      {links && links.length > 0 && (
        <section className="mb-12">
          <SectionTitle>{copy.sections.more}</SectionTitle>
          <nav className="flex flex-wrap gap-2">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="inline-flex items-center h-9 px-3.5 rounded-md text-[13px] font-medium bg-bg-surface border-[0.5px] border-border-strong text-ink-primary no-underline hover:bg-bg-muted transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </section>
      )}

      <p className="text-[12px] text-ink-tertiary mb-12 pt-4 border-t-[0.5px] border-border-subtle">
        {copy.compiled}
      </p>

      <DownloadCard
        t={t}
        latestVersion={release.latestVersion}
        latestDmgUrl={release.latestDmgUrl}
        latestZipUrl={release.latestZipUrl}
        className="my-16 max-w-[720px]"
      />
    </main>
  );
}

// ─── PIECES ───

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[20px] font-medium tracking-[-0.015em] text-ink-primary mb-4">
      {children}
    </h2>
  );
}

function ContenderCard({
  app,
  copy,
  totals,
}: {
  app: CompareApp;
  copy: Copy;
  totals: { reads: number; writes: number };
}) {
  const facts: [string, string][] = [
    [copy.facts.price, app.price],
    [copy.facts.licence, app.licence],
    [copy.facts.requires, app.requires],
    [copy.facts.shape, app.shape],
  ];

  return (
    <article className="flex flex-col p-4 bg-bg-surface border-[0.5px] border-border-default rounded-md">
      <h3 className="text-[15px] font-medium text-ink-primary tracking-[-0.005em] m-0">
        {app.name}
      </h3>
      <p className="font-mono text-[11px] text-ink-tertiary mt-1 mb-3">{app.version}</p>
      <dl className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-3 gap-y-1 m-0 text-[12px] leading-[1.5] flex-1">
        {facts.map(([k, v]) => (
          <div key={k} className="contents">
            <dt className="font-mono text-[10px] tracking-[0.06em] uppercase text-ink-tertiary self-center">
              {k}
            </dt>
            <dd className="m-0 text-ink-secondary">{v}</dd>
          </div>
        ))}
      </dl>
      <div className="flex gap-5 mt-3 pt-3 border-t-[0.5px] border-border-subtle">
        <div className="flex flex-col">
          <span className="text-[20px] leading-none font-medium text-compare-read tabular-nums">
            {totals.reads}
          </span>
          <span className="font-mono text-[10px] tracking-[0.08em] uppercase text-ink-tertiary mt-1">
            {copy.reads}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-[20px] leading-none font-medium text-compare-write tabular-nums">
            {totals.writes}
          </span>
          <span className="font-mono text-[10px] tracking-[0.08em] uppercase text-ink-tertiary mt-1">
            {copy.writes}
          </span>
        </div>
      </div>
    </article>
  );
}

function BandGroup({
  band,
  apps,
  copy,
}: {
  band: FormatBand;
  apps: CompareApp[];
  copy: Copy;
}) {
  return (
    <>
      {/* The band row repeats the app names: the sticky <thead> only sticks
          inside the horizontal scroll container, so it is gone by the time you
          reach the lower bands and the columns lose their labels. */}
      <tr>
        <th
          scope="rowgroup"
          className="sticky left-0 bg-bg-muted text-left font-mono text-[10px] tracking-[0.1em] uppercase text-ink-secondary px-3.5 py-2 border-y-[0.5px] border-border-default"
        >
          {band.label}
        </th>
        {apps.map((app) => (
          <th
            key={app.id}
            colSpan={2}
            scope="colgroup"
            className="bg-bg-muted text-center font-normal text-[10.5px] text-ink-tertiary px-1.5 py-2 whitespace-nowrap border-y-[0.5px] border-border-default border-l-[0.5px] border-l-border-default"
          >
            {app.name}
          </th>
        ))}
      </tr>
      {band.rows.map((row) => {
        const states = decodeCells(row.cells);
        return (
          <tr key={row.label} className="group">
            <th
              scope="row"
              className="sticky left-0 z-[1] bg-bg-surface group-hover:bg-bg-muted transition-colors text-left font-medium text-ink-primary align-middle px-3.5 py-2 border-b-[0.5px] border-border-subtle border-r-[0.5px] border-r-border-default"
            >
              {row.label}
              {row.ext && (
                <span className="block font-mono font-normal text-[10.5px] text-ink-tertiary mt-0.5">
                  {row.ext}
                </span>
              )}
            </th>
            {states.map((state, i) => {
              const app = apps[Math.floor(i / 2)];
              const tone: Tone = i % 2 === 0 ? "read" : "write";
              const kind = i % 2 === 0 ? copy.columns.read : copy.columns.write;
              return (
                <Cell
                  key={i}
                  state={state}
                  tone={tone}
                  copy={copy}
                  note={row.fn?.[i]}
                  title={`${app.name} ${kind}: ${copy.legend[state]}`}
                />
              );
            })}
          </tr>
        );
      })}
    </>
  );
}

/**
 * Read and write get their own hue, and a supported cell gets a wash of it, so a
 * column reads as a block instead of as scattered dots. Unsupported cells stay
 * on the plain surface — the eye should land on what an app *can* do.
 */
const TONE = {
  read: {
    ink: "text-compare-read",
    wash: "bg-compare-read-soft",
    swatch: "bg-compare-read",
  },
  write: {
    ink: "text-compare-write",
    wash: "bg-compare-write-soft",
    swatch: "bg-compare-write",
  },
} as const;

type Tone = keyof typeof TONE;

const CHAR: Record<Support, string> = { yes: "●", partial: "◑", no: "○" };

function Cell({
  state,
  tone,
  copy,
  note,
  title,
}: {
  state: Support;
  tone: Tone;
  copy: Copy;
  note?: number;
  title: string;
}) {
  const supported = state !== "no";

  return (
    <td
      title={title}
      className={`text-center align-middle border-l-[0.5px] border-border-default border-b-[0.5px] border-b-border-subtle ${
        supported ? TONE[tone].wash : ""
      }`}
    >
      <span
        aria-hidden="true"
        className={`text-[13px] leading-none ${supported ? TONE[tone].ink : "text-compare-off"}`}
      >
        {CHAR[state]}
      </span>
      <span className="sr-only">{copy.legend[state]}</span>
      {note && (
        <sup className="text-[9px]">
          <a
            href={`#fn-${note}`}
            className={`no-underline hover:underline ${
              supported ? TONE[tone].ink : "text-ink-tertiary"
            }`}
          >
            {note}
          </a>
        </sup>
      )}
    </td>
  );
}

function Legend({ copy, tones = false }: { copy: Copy; tones?: boolean }) {
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-3 text-[12px] text-ink-secondary">
      {(["yes", "partial", "no"] as Support[]).map((state) => (
        <span key={state} className="inline-flex items-center gap-1.5">
          <span
            aria-hidden="true"
            className={state === "no" ? "text-compare-off" : "text-compare-read"}
          >
            {CHAR[state]}
          </span>
          {copy.legend[state]}
        </span>
      ))}

      {tones && (
        <>
          <span aria-hidden="true" className="text-border-strong">
            ·
          </span>
          {(["read", "write"] as Tone[]).map((tone) => (
            <span key={tone} className="inline-flex items-center gap-1.5">
              <span
                aria-hidden="true"
                className={`inline-block w-2.5 h-2.5 rounded-sm ${TONE[tone].swatch}`}
              />
              {tone === "read" ? copy.columns.read : copy.columns.write}
            </span>
          ))}
        </>
      )}
    </div>
  );
}
