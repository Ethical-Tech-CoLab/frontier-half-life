// Palette facts and source metadata adapted from Neocloud Supply OS (Apache-2.0).
// See ../licenses/NOTICE.txt. Contrast derivation and shell styling are original.
import { mix, contrast, readableColor } from './color.mjs';

export const REGISTRY_SOURCE = 'https://github.com/yorkerhodes3/neocloud-supply-os/blob/96a6161c6d2b5e70b86c354cf1f164e67d74fec2/docs/assets/js/themes.js';
export const ANTHROPIC_SOURCE = 'https://github.com/anthropics/skills/blob/e4bb5d960d87126ff3b3a8af1a104b7db67560ba/skills/brand-guidelines/SKILL.md';
export const DEFAULT_BRAND = 'colab';
export const BRAND_ALIASES = Object.freeze({ 'voltage-park': 'voltagepark' });
const DESIGN_SOURCE = 'https://github.com/Ethical-Tech-CoLab/website/blob/main/docs/DESIGN-SYSTEM.md';
const SANS = 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
const MONO = 'ui-monospace, "SFMono-Regular", Consolas, "Liberation Mono", monospace';

const definitions = {
  colab: {
    name: 'Ethical Tech CoLab', short: 'CoLab', sourceId: 'colab', ground: 'dark',
    bg: '#120c1a', fg: '#f3eefb', accent: '#c8f04b', glow: '#7b5cff',
    surface: '#1b1226', card: '#201630', radius: 18,
    display: '"Bebas Neue", Impact, sans-serif',
    body: `"Space Mono", ${MONO}`, mono: `"Space Mono", ${MONO}`,
    displayCase: 'uppercase', displayTracking: '0.02em', displayWeight: 400, displayLeading: 0.9,
    confidence: 'high', sources: [DESIGN_SOURCE],
    description: 'Near-black purple, signature lime, and violet accents.',
    deviation: 'CoLab uses self-hosted Bebas Neue 400 headings and Space Mono 400/700 body/UI text, as in the lab and neocloud-supply-os. Latin subsets have system fallbacks for other glyphs.',
  },
  'colab-daylight': {
    name: 'CoLab Daylight', short: 'Daylight', sourceId: 'colab-daylight', ground: 'light',
    bg: '#f5f2f9', fg: '#1a1020', accent: '#5f6b00', glow: '#6d28d9',
    surface: '#ffffff', card: '#ffffff', radius: 18,
    display: '"Bebas Neue", Impact, sans-serif',
    body: `"Space Mono", ${MONO}`, mono: `"Space Mono", ${MONO}`,
    displayCase: 'uppercase', displayTracking: '0.02em', displayWeight: 400, displayLeading: 0.9,
    confidence: 'high', sources: [DESIGN_SOURCE],
    description: 'Lilac-white ground with olive and violet accents.',
    deviation: 'The daylight theme retains the same self-hosted Bebas Neue headings and Space Mono body/UI as the flagship CoLab theme.',
  },
  anthropic: {
    name: 'Anthropic', short: 'Anthropic', sourceId: 'anthropic', ground: 'light',
    bg: '#faf9f5', fg: '#141413', accent: '#d97757', glow: '#788c5d',
    surface: '#f1efe7', card: '#faf9f5', radius: 10,
    display: 'Arial, Helvetica, sans-serif', body: 'Georgia, "Times New Roman", serif',
    confidence: 'high for published palette; approximate execution', sources: [ANTHROPIC_SOURCE],
    description: 'Warm paper, dark ink, and a terracotta accent from Anthropic’s public identity reference.',
    deviation: 'Arial and Georgia replace Poppins and Lora. Terracotta is darkened for accessible text and controls.',
  },
  openai: {
    name: 'OpenAI', short: 'OpenAI', sourceId: 'openai', ground: 'light',
    bg: '#ffffff', fg: '#0f0f0f', accent: '#10a37f', glow: '#10a37f',
    surface: '#f7f7f8', card: '#ffffff', radius: 18, confidence: 'medium',
    sources: ['https://openai.com/brand/', 'https://colorarchive.org/brands/openai/', 'https://mobbin.com/colors/brand/openai'],
    description: 'Quiet monochrome surfaces with a restrained green accent.',
    deviation: 'System sans replaces the reference’s Inter substitute for proprietary OpenAI Sans; green is contrast-adjusted.',
  },
  coreweave: {
    name: 'CoreWeave', short: 'CoreWeave', sourceId: 'coreweave', ground: 'light',
    bg: '#ffffff', fg: '#0a0a0f', accent: '#2741e7', glow: '#2741e7',
    radius: 12, confidence: 'medium',
    sources: ['https://brandfetch.com/coreweave.com', 'https://dwglogo.com/color-codes/coreweave/', 'https://www.characterquilt.com/branding/coreweave'],
    description: 'White space, near-black type, and cobalt accents.',
    deviation: 'System sans replaces Plus Jakarta Sans; no reference fonts are bundled.',
  },
  nebius: {
    name: 'Nebius', short: 'Nebius', sourceId: 'nebius', ground: 'dark',
    bg: '#052b42', fg: '#ffffff', accent: '#e0ff4f', glow: '#3277ff',
    radius: 24, confidence: 'medium',
    sources: ['https://www.keenwaves.com/nebius-design-code', 'https://brandfetch.com/nebius.com', 'https://www.designyourway.net/blog/nebius-logo/'],
    description: 'Deep navy with neon lime and blue accents.',
    deviation: 'System sans replaces the reference’s Space Grotesk and Inter, not proprietary Gramatika.',
  },
  lambda: {
    name: 'Lambda', short: 'Lambda', sourceId: 'lambda', ground: 'dark',
    bg: '#0b0b0b', fg: '#fefefe', accent: '#6236f4', glow: '#6236f4',
    radius: 8, confidence: 'medium',
    sources: ['https://lambda.ai/brand-guidelines', 'https://brandfetch.com/lambdalabs.com', 'https://www.characterquilt.com/branding/lambda'],
    description: 'Black ground and electric violet in a restrained grid.',
    deviation: 'System sans replaces the reference’s Archivo substitute for Suisse Int’l; violet is lightened for contrast.',
  },
  crusoe: {
    name: 'Crusoe', short: 'Crusoe', sourceId: 'crusoe', ground: 'light',
    bg: '#ffffff', fg: '#000000', accent: '#ceeb13', glow: '#f59a36',
    radius: 16, confidence: 'medium',
    sources: ['https://brandfetch.com/crusoe.ai', 'https://www.designyourway.net/blog/crusoe-logo/'],
    description: 'Open white ground with lime and warm orange accents.',
    deviation: 'System sans replaces unconfirmed Instrument Sans; lime is substantially darkened for legible controls.',
  },
  together: {
    name: 'Together AI', short: 'Together', sourceId: 'together', ground: 'light',
    bg: '#ffffff', fg: '#0f172a', accent: '#6366f1', glow: '#8b5cf6',
    radius: 22, confidence: 'medium',
    sources: ['https://www.designpieces.com/palette/together-ai-color-palette-hex-and-rgb/'],
    description: 'Bright surfaces, indigo and violet, and rounded cards.',
    deviation: 'System sans replaces the reference’s unconfirmed Geist; indigo is contrast-adjusted.',
  },
  nscale: {
    name: 'Nscale', short: 'Nscale', sourceId: 'nscale', ground: 'dark',
    bg: '#0a0e14', fg: '#ffffff', accent: '#6b5bff', glow: '#6b5bff',
    radius: 12, confidence: 'low; reference palette unverified',
    sources: ['https://www.nscale.com/media-kit'],
    description: 'A minimal dark-and-violet placeholder, not a verified company palette.',
    deviation: 'System sans replaces DM Sans; the reference itself labels these colors unverified.',
  },
  fluidstack: {
    name: 'Fluidstack', short: 'Fluidstack', sourceId: 'fluidstack', ground: 'dark',
    bg: '#131313', fg: '#ffffff', accent: '#d5a81f', glow: '#d5a81f',
    radius: 12, confidence: 'medium',
    sources: ['https://brandfetch.com/fluidstack.io', 'https://colorcodehub.com/brand/fluidstack.com'],
    description: 'Charcoal ground, gold accents, and bold typography.',
    deviation: 'System sans replaces unconfirmed Outfit and Inter.',
  },
  vultr: {
    name: 'Vultr', short: 'Vultr', sourceId: 'vultr', ground: 'light',
    bg: '#f8f8f8', fg: '#0b1222', accent: '#007bfc', glow: '#51b9ff',
    surface: '#ffffff', card: '#ffffff', radius: 12, confidence: 'high',
    sources: ['https://www.vultr.com/dist/brand-assets/vultr-brand-book.pdf', 'https://brandfetch.com/vultr.com'],
    description: 'Light neutral surfaces and clear blue accents.',
    deviation: 'System sans replaces Roboto; blue is darkened for accessible text.',
  },
  voltagepark: {
    name: 'Voltage Park', short: 'Voltage Park', sourceId: 'voltage-park', ground: 'dark',
    bg: '#0f0f0f', fg: '#ffffff', accent: '#cbfc55', glow: '#6929c4',
    radius: 16, confidence: 'medium',
    sources: ['https://brandfetch.com/voltagepark.com'],
    description: 'Near-black ground with lime and purple accents.',
    deviation: 'System sans replaces unconfirmed Red Hat Display and Manrope. The source ID is voltage-park; this shell also accepts that alias.',
  },
};

export const THEMES = Object.freeze(Object.fromEntries(Object.entries(definitions).map(([id, theme]) =>
  [id, Object.freeze({
    ...theme,
    id,
    sources: Object.freeze([...theme.sources]),
    approximation: true,
    affiliation: 'No affiliation or endorsement. No company logos are used.',
    licensing: id === 'anthropic'
      ? 'Public identity color facts only; no source text, logos, or fonts redistributed.'
      : 'Palette and source metadata adapted from the Apache-2.0 reference; attribution and license included locally.',
    registry: id === 'anthropic' ? ANTHROPIC_SOURCE : REGISTRY_SOURCE,
  })])));

export function tokensFor(theme) {
  const dark = theme.ground === 'dark';
  const surface = theme.surface || mix(theme.bg, theme.fg, dark ? 0.045 : 0.025);
  const card = theme.card || mix(theme.bg, theme.fg, dark ? 0.07 : 0.01);
  const backgrounds = [theme.bg, surface, card];
  const accent = readableColor(theme.accent, backgrounds);
  const accentInk = contrast('#141413', accent) >= 4.5 ? '#141413' : '#ffffff';
  return Object.freeze({
    '--bg': theme.bg,
    '--surface': surface,
    '--card': card,
    '--fg': readableColor(theme.fg, backgrounds),
    '--muted': readableColor(mix(theme.fg, theme.bg, 0.35), backgrounds),
    '--accent': accent,
    '--accent-ink': accentInk,
    '--focus': accent,
    '--control': readableColor(mix(theme.fg, theme.bg, 0.5), backgrounds, 3.1),
    '--line': mix(theme.bg, theme.fg, dark ? 0.18 : 0.16),
    '--glow': theme.glow,
    '--font-display': theme.display || SANS,
    '--font-body': theme.body || SANS,
    '--font-mono': theme.mono || MONO,
    '--display-case': theme.displayCase || 'none',
    '--display-tracking': theme.displayTracking || '-0.025em',
    '--display-weight': String(theme.displayWeight || 600),
    '--display-leading': String(theme.displayLeading || 1.12),
    '--radius': `${theme.radius}px`,
    '--color-scheme': theme.ground,
  });
}
