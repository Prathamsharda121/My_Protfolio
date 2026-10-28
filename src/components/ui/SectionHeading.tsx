import { Reveal } from "@/components/Reveal";
import { SplitText } from "@/components/ui/SplitText";
import { Scramble } from "@/components/ui/Scramble";

type Props = {
  index?: string;
  eyebrow: string;
  title: string;
  /** Optional word(s) at the end of the title rendered in italic serif gradient. */
  accent?: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeading({ index, eyebrow, title, accent, description, align = "left" }: Props) {
  const center = align === "center";
  return (
    <div className={center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <Reveal>
        <div className={`flex items-center gap-3 ${center ? "justify-center" : ""}`}>
          {index && <span className="font-mono text-xs text-cyan">{index}</span>}
          <span className="h-px w-10 bg-gradient-to-r from-cyan to-violet" />
          <Scramble text={eyebrow.toUpperCase()} className="font-mono text-xs uppercase tracking-[0.25em] text-muted" />
        </div>
      </Reveal>
      <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
        <SplitText text={title} />
        {accent && (
          <>
            {" "}
            <SplitText
              text={accent}
              delay={0.25}
              wordClassName="font-serif italic font-normal gradient-flow pr-1"
            />
          </>
        )}
      </h2>
      {description && (
        <Reveal delay={0.2}>
          <p className={`mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg ${center ? "mx-auto" : ""}`}>
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
