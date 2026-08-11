/**
 * Renders the three-token mini-markdown used by the comparison data:
 * `**bold**`, `` `code` `` and `[text](url)`.
 *
 * ponytail: three tokens, one regex — no markdown dependency and no
 * dangerouslySetInnerHTML. Swap in a real parser only if the copy ever needs
 * block-level syntax (lists, headings, images).
 */

const TOKEN = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]\n]+\]\([^)\s]+\))/g;
const LINK = /^\[([^\]]+)\]\(([^)]+)\)$/;

export default function RichText({ text }: { text: string }) {
  return (
    <>
      {text.split(TOKEN).map((part, i) => {
        if (!part) return null;

        if (part.startsWith("**")) {
          return (
            <strong key={i} className="font-medium text-ink-primary">
              {part.slice(2, -2)}
            </strong>
          );
        }

        if (part.startsWith("`")) {
          return (
            <code
              key={i}
              className="font-mono text-[0.88em] bg-bg-muted border-[0.5px] border-border-subtle rounded-sm px-1 py-px"
            >
              {part.slice(1, -1)}
            </code>
          );
        }

        const link = LINK.exec(part);
        if (link) {
          return (
            <a
              key={i}
              href={link[2]}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink-primary underline underline-offset-2 decoration-border-strong hover:decoration-ink-primary"
            >
              {link[1]}
            </a>
          );
        }

        return part;
      })}
    </>
  );
}
