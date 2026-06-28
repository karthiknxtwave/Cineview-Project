const INTL_LOCALE_MAP: Record<string, string> = {
  en: "en-US",
  es: "es-ES",
}

const toIntlLocale = (locale: string): string =>
  INTL_LOCALE_MAP[locale] ?? locale

export function formatDisplayDate(
  dateString: string,
  locale: string,
): string {
  if (!dateString) {
    return "—"
  }

  const date = new Date(`${dateString}T00:00:00`)

  if (Number.isNaN(date.getTime())) {
    return "—"
  }

  return new Intl.DateTimeFormat(toIntlLocale(locale), {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date)
}

export function formatDisplayYear(
  dateString: string,
  locale: string,
): string {
  if (!dateString) {
    return "—"
  }

  const date = new Date(`${dateString}T00:00:00`)

  if (Number.isNaN(date.getTime())) {
    return "—"
  }

  return new Intl.DateTimeFormat(toIntlLocale(locale), {
    year: "numeric",
  }).format(date)
}
