export const COLUMN_NAMES_MAP: Record<string, string> = {
  "id": "ID",
  "title": "Titre",
  "author": "Auteur",
  "user": "Utilisateur",
  "cstName": "Constitution",
  "date": "Date",
  "platform": "Plateforme",
  "url": "URL"
}

export const DEFAULT_COLUMNS_ORDER = Object.keys(COLUMN_NAMES_MAP) // ["id", "title", "author", "user", "cstName", "date", "platform", "url"];

export const NON_FILTER_KEYS = ["platform", "url"]

