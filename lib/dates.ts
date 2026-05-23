const LOCALE = 'en-US';

/** Human-readable date, e.g. "February 2, 2025". Parsed as UTC to avoid off-by-one. */
export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString(LOCALE, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

/** Short form, e.g. "Feb 2025". */
export function formatMonthYear(date: string): string {
  return new Date(date).toLocaleDateString(LOCALE, {
    year: 'numeric',
    month: 'short',
    timeZone: 'UTC',
  });
}
