import { LogoStyle } from "../types";

export function formatLogoStyle(style: LogoStyle): string {
    const words = style
      .replace(/([A-Z])/g, " $1")
      .trim()
      .split(" ");
    return words
      .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join(" ");
  }

export const LOGO_STYLES: LogoStyle[] = [
  "NoStyle",
  "Monogram",
  "Abstract",
  "Mascot",
];

export const logoStyleOptions = LOGO_STYLES.map((s) => ({
  value: s,
  label: formatLogoStyle(s),
}));
