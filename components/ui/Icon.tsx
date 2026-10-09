// Mapa de íconos lucide usados desde los datos (lib/*.ts guarda el nombre).
import {
  Armchair,
  Cake,
  Camera,
  CookingPot,
  Crown,
  Footprints,
  Gift,
  Hourglass,
  Mail,
  Palette,
  PartyPopper,
  ShieldCheck,
  Sofa,
  Sparkles,
  Sun,
  Sunset,
  Utensils,
  type LucideIcon,
  type LucideProps,
} from "lucide-react";

const icons: Record<string, LucideIcon> = {
  Armchair,
  Cake,
  Camera,
  CookingPot,
  Crown,
  Footprints,
  Gift,
  Hourglass,
  Mail,
  Palette,
  PartyPopper,
  ShieldCheck,
  Sofa,
  Sparkles,
  Sun,
  Sunset,
  Utensils,
};

export function Icon({ name, ...props }: { name: string } & LucideProps) {
  const Cmp = icons[name] ?? Sparkles;
  return <Cmp aria-hidden {...props} />;
}
