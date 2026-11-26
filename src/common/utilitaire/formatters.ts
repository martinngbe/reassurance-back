import Decimal from 'decimal.js';

/**
 * Formate une valeur Decimal/number/string en format monétaire français.
 * Ex: 1234567.89 → "1 234 567,89"
 */
export function formatDecimal(
  val: Decimal | number | string | null | undefined,
  options: {
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
    currency?: string;       // 'XOF', 'EUR', etc.
    useCurrencySymbol?: boolean;
  } = {}
): string {
  const {
    minimumFractionDigits = 2,
    maximumFractionDigits = 2,
    currency,
    useCurrencySymbol = false,
  } = options;

  if (val === null || val === undefined) return '0,00';

  const numberValue =
    typeof val === 'number' ? val : parseFloat(val.toString());

  if (isNaN(numberValue)) return '0,00';

  // Instanciation locale (léger overhead, mais évite de partager un état)
  const formatter = new Intl.NumberFormat('fr-FR', {
    minimumFractionDigits,
    maximumFractionDigits,
    style: useCurrencySymbol && currency ? 'currency' : 'decimal',
    currency: useCurrencySymbol && currency ? currency : undefined,
    useGrouping: true,
  });

  return formatter.format(numberValue);
}

/**
 * Formate une date en français.
 * Ex: 2026-11-26 → "26 novembre 2026"
 */
export function formatDate(
  d: Date | string | undefined,
  format: 'long' | 'short' | 'medium' = 'long'
): string | null {
  if (!d) return null;

  const date = typeof d === 'string' ? new Date(d) : d;
  if (isNaN(date.getTime())) return null;

  const formats: Record<string, Intl.DateTimeFormatOptions> = {
    short: { day: '2-digit', month: '2-digit', year: 'numeric' },
    medium: { day: '2-digit', month: 'short', year: 'numeric' },
    long: { day: '2-digit', month: 'long', year: 'numeric' },
  };

  return new Intl.DateTimeFormat('fr-FR', formats[format]).format(date);
}

/**
 * Formate un pourcentage.
 * Ex: 75.5 → "75,50 %"
 */
export function formatPercent(
  val: Decimal | number | string | null | undefined,
  digits = 2
): string {
  if (val === null || val === undefined) return '0,00 %';

  const numberValue =
    typeof val === 'number' ? val : parseFloat(val.toString());

  return new Intl.NumberFormat('fr-FR', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
    style: 'percent',
  }).format(numberValue / 100); // Intl attend 0.75 pour 75%
}

/**
 * Formate un numéro de police/quittance avec espacement.
 * Ex: "PAT-26-00083" (inchangé, mais sécurisé)
 */
export function formatReference(ref: string | null | undefined): string {
  if (!ref) return '—';
  return String(ref).toUpperCase();
}