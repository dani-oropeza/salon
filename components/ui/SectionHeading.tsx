import { Reveal } from "./Reveal";
import { Eyebrow } from "./Eyebrow";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  tone = "dark",
  align = "center",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  tone?: "dark" | "light";
  align?: "center" | "left";
}) {
  const light = tone === "light";
  return (
    <Reveal
      className={`flex max-w-2xl flex-col ${
        align === "center" ? "mx-auto items-center text-center" : "items-start text-left"
      }`}
    >
      {eyebrow !== undefined && <Eyebrow tone={tone} />}
      <h2
        className={`mt-4 text-[2.15rem] font-semibold leading-[1.05] md:text-[3rem] ${
          light ? "text-cream" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 max-w-xl text-base leading-relaxed md:text-[1.075rem] ${
            light ? "text-cream/75" : "text-ink-soft"
          }`}
        >
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
