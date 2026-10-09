"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { gallery, type GalleryItem } from "@/lib/content";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";

const filters = [
  { id: "todas", label: "Todas" },
  { id: "fiestas", label: "Fiestas reales" },
  { id: "salon", label: "El salón" },
] as const;
type FilterId = (typeof filters)[number]["id"];

const MOBILE_INITIAL = 8;

function Lightbox({
  items,
  index,
  onClose,
  onIndex,
}: {
  items: GalleryItem[];
  index: number;
  onClose: () => void;
  onIndex: (i: number) => void;
}) {
  const [dir, setDir] = useState(0);
  const go = useCallback(
    (d: number) => {
      setDir(d);
      onIndex((index + d + items.length) % items.length);
    },
    [index, items.length, onIndex],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [go, onClose]);

  const item = items[index];

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Galería de fotos"
      className="fixed inset-0 z-[70] flex flex-col bg-jungle-950/95 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center justify-between px-4 pt-[max(1rem,env(safe-area-inset-top))] text-cream">
        <p className="text-sm font-semibold tabular-nums text-cream/70" aria-live="polite">
          {index + 1} / {items.length}
        </p>
        <button
          onClick={onClose}
          autoFocus
          aria-label="Cerrar galería"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-cream/10 transition-colors hover:bg-cream/20"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="relative flex flex-1 items-center justify-center overflow-hidden px-2 py-4 sm:px-16">
        <AnimatePresence initial={false} custom={dir} mode="popLayout">
          <motion.div
            key={index}
            custom={dir}
            className="relative h-full w-full"
            initial={{ opacity: 0, x: dir * 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: dir * -60 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.25}
            onDragEnd={(_, info) => {
              if (info.offset.x < -60) go(1);
              else if (info.offset.x > 60) go(-1);
            }}
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes="100vw"
              placeholder="blur"
              className="pointer-events-none select-none object-contain"
              draggable={false}
            />
          </motion.div>
        </AnimatePresence>

        <button
          onClick={() => go(-1)}
          aria-label="Foto anterior"
          className="absolute left-3 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-cream/10 text-cream transition-colors hover:bg-cream/20 sm:inline-flex"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={() => go(1)}
          aria-label="Foto siguiente"
          className="absolute right-3 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-cream/10 text-cream transition-colors hover:bg-cream/20 sm:inline-flex"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      <div className="flex items-center justify-between gap-4 px-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] text-cream">
        <button
          onClick={() => go(-1)}
          aria-label="Foto anterior"
          className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-cream/10 sm:hidden"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <p className="flex-1 text-center text-[0.9rem] text-cream/80">{item.alt}</p>
        <button
          onClick={() => go(1)}
          aria-label="Foto siguiente"
          className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-cream/10 sm:hidden"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
    </motion.div>
  );
}

export function Gallery() {
  const [filter, setFilter] = useState<FilterId>("todas");
  const [expanded, setExpanded] = useState(false);
  const [open, setOpen] = useState<number | null>(null);

  const items = useMemo(
    () => (filter === "todas" ? gallery : gallery.filter((g) => g.kind === filter)),
    [filter],
  );

  return (
    <section id="galeria" className="relative overflow-hidden bg-jungle-950 py-20 text-cream md:py-28">
      <div aria-hidden className="glow-amber absolute inset-0" />
      <div className="relative mx-auto max-w-6xl px-5 md:px-6">
        <SectionHeading
          tone="light"
          eyebrow="Galería"
          title="Así se viven nuestras fiestas"
          subtitle="Fotos reales del salón y de los cumpleaños que ya celebramos."
        />

        <Reveal className="mt-8 flex justify-center">
          <div role="group" aria-label="Filtrar fotos" className="inline-flex rounded-full bg-cream/[0.06] p-1 ring-1 ring-inset ring-cream/10">
            {filters.map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                aria-pressed={filter === f.id}
                className={`min-h-10 rounded-full px-4 text-[0.88rem] font-bold transition-colors ${
                  filter === f.id ? "bg-cream text-ink" : "text-cream/75 hover:text-cream"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </Reveal>

        <ul className="mt-8 grid auto-rows-[9.5rem] grid-flow-dense grid-cols-2 gap-2.5 sm:auto-rows-[12rem] md:grid-cols-4 md:gap-3 lg:auto-rows-[13.5rem]">
          {items.map((g, i) => (
            <li
              key={g.alt}
              className={`${g.span === "wide" ? "col-span-2" : ""} ${g.span === "tall" ? "row-span-2" : ""} ${
                !expanded && i >= MOBILE_INITIAL ? "hidden md:block" : ""
              }`}
            >
              <button
                onClick={() => setOpen(i)}
                className="group relative block h-full w-full overflow-hidden rounded-2xl bg-jungle-900 md:rounded-3xl"
                aria-label={`Ampliar foto: ${g.alt}`}
              >
                <Image
                  src={g.src}
                  alt={g.alt}
                  fill
                  sizes={g.span === "wide" ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 25vw, 50vw"}
                  placeholder="blur"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="absolute bottom-2.5 right-2.5 inline-flex h-9 w-9 items-center justify-center rounded-full bg-cream/90 text-ink opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                  <Expand className="h-4 w-4" aria-hidden />
                </span>
              </button>
            </li>
          ))}
        </ul>

        {!expanded && items.length > MOBILE_INITIAL && (
          <div className="mt-6 flex justify-center md:hidden">
            <button
              onClick={() => setExpanded(true)}
              className="inline-flex min-h-12 items-center rounded-full border border-cream/25 px-6 text-[0.95rem] font-bold text-cream"
            >
              Ver las {items.length} fotos
            </button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {open !== null && (
          <Lightbox items={items} index={open} onIndex={setOpen} onClose={() => setOpen(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
