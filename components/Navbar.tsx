"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, BadgePercent, Menu, X } from "lucide-react";
import { nav, promo, site, formatBs } from "@/lib/site";
import { brand } from "@/lib/images";
import { waLink } from "@/lib/whatsapp";
import { scrollToId } from "@/lib/scroll";
import { WhatsAppIcon } from "./ui/BrandIcons";
import { btn } from "./ui/buttons";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: resalta la sección visible en el menú de escritorio.
  useEffect(() => {
    const ids = nav.map((n) => n.href.slice(1));
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(`#${e.target.id}`);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Bloquea el scroll del fondo con el menú móvil abierto.
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const solid = scrolled || open;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Franja de promo: se pliega al hacer scroll para ganar espacio. */}
      {promo.active && (
        <div
          className={`overflow-hidden bg-jungle-950 text-cream transition-[max-height] duration-300 ${
            scrolled ? "max-h-0" : "max-h-12"
          }`}
        >
          <a
            href="#paquetes"
            className="mx-auto flex h-9 max-w-6xl items-center justify-center gap-2 px-4 text-[0.8rem] font-semibold"
          >
            <BadgePercent className="h-4 w-4 shrink-0 text-amber" aria-hidden />
            <span className="truncate">
              <span className="text-amber">{promo.label}:</span> ahorra Bs {formatBs(promo.amount)}
              <span className="hidden sm:inline"> en todos los paquetes</span>
            </span>
          </a>
        </div>
      )}

      <div
        className={`transition-[background-color,box-shadow,border-color] duration-300 ${
          solid
            ? "border-b border-ink/10 bg-sand-50/90 shadow-[0_10px_30px_-18px_rgb(30_26_20/0.35)] backdrop-blur-md"
            : "border-b border-transparent bg-gradient-to-b from-jungle-950/70 to-transparent"
        }`}
      >
        <nav
          aria-label="Principal"
          className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 md:px-6"
        >
          <a href="#inicio" className="flex items-center gap-2" aria-label={`${site.name}, inicio`}>
            <Image
              src={solid ? brand.tiki : brand.tikiLight}
              alt=""
              className="h-10 w-auto lg:h-11"
              sizes="44px"
              placeholder="empty"
            />
            <Image
              src={solid ? brand.wordmark : brand.wordmarkLight}
              alt={site.name}
              className="h-7 w-auto lg:h-8"
              sizes="90px"
              placeholder="empty"
            />
          </a>

          {/* Escritorio */}
          <div className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => {
              const isActive = active === item.href;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative rounded-full px-3.5 py-2 text-[0.92rem] font-semibold transition-colors ${
                    solid
                      ? isActive
                        ? "text-ink"
                        : "text-ink-soft hover:text-ink"
                      : isActive
                        ? "text-cream"
                        : "text-cream/80 hover:text-cream"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-dot"
                      className="absolute inset-x-3.5 -bottom-0.5 h-0.5 rounded-full bg-sunset"
                    />
                  )}
                </a>
              );
            })}
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className={`${btn.primary} ml-3 !min-h-11 !px-5 !text-[0.9rem]`}
            >
              <WhatsAppIcon className="h-4 w-4" />
              Reservar
            </a>
          </div>

          {/* Móvil */}
          <div className="flex items-center gap-1 lg:hidden">
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Escribir por WhatsApp"
              className={`inline-flex h-11 w-11 items-center justify-center rounded-full transition-colors ${
                solid ? "text-jungle-700 hover:bg-ink/5" : "text-cream hover:bg-cream/10"
              }`}
            >
              <WhatsAppIcon className="h-[1.35rem] w-[1.35rem]" />
            </a>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              className={`inline-flex h-11 w-11 items-center justify-center rounded-full transition-colors ${
                solid ? "text-ink hover:bg-ink/5" : "text-cream hover:bg-cream/10"
              }`}
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </nav>
      </div>

      {/* Menú móvil a pantalla completa */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 bottom-0 top-16 overflow-y-auto bg-sand-50 lg:hidden"
          >
            <div className="mx-auto flex min-h-full max-w-md flex-col px-6 pb-[max(2rem,env(safe-area-inset-bottom))] pt-4">
              <ul className="divide-y divide-ink/10">
                {nav.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.03 + i * 0.04, duration: 0.25 }}
                  >
                    <a
                      href={item.href}
                      onClick={(e) => {
                        // Cerramos primero y luego desplazamos (el cierre
                        // animado cancelaría el smooth scroll nativo).
                        e.preventDefault();
                        setOpen(false);
                        window.setTimeout(() => scrollToId(item.href.slice(1)), 240);
                      }}
                      className="flex min-h-14 items-center justify-between py-3 font-display text-[1.6rem] font-semibold text-ink"
                    >
                      {item.label}
                      <ArrowRight className="h-5 w-5 text-ink/30" aria-hidden />
                    </a>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-auto space-y-3 pt-8">
                <a
                  href={waLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${btn.primary} w-full`}
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  Reservar por WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
