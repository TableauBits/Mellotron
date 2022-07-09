import { DataSong } from "../services/data-manager.service";

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

export const DEFAULT_COLUMNS_ORDER = Object.keys(COLUMN_NAMES_MAP);

export const NON_FILTER_KEYS = ["platform", "url"]

export function filterPredicateFunction(currentKeys: string[]) {
  return (data: DataSong, filter: string): boolean => {
    // Transform the data into a lowercase string of all property values.
    const dataStr = Object.keys(data).filter((value) => currentKeys.includes(value) && !NON_FILTER_KEYS.includes(value))
      .reduce((currentTerm: string, key: string) => {
        // Use an obscure Unicode character to delimit the words in the concatenated string.
        // This avoids matches where the values of two columns combined will match the user's query
        // (e.g. `Flute` and `Stop` will match `Test`). The character is intended to be something
        // that has a very low chance of being typed in by somebody in a text field. This one in
        // particular is "White up-pointing triangle with dot" from
        // https://en.wikipedia.org/wiki/List_of_Unicode_characters
        return currentTerm + (data as {[key: string]: any})[key] + '◬';
      }, '')
      .toLowerCase();

    // Transform the filter by converting it to lowercase and removing whitespace.
    const transformedFilter = filter.trim().toLowerCase();

    return dataStr.indexOf(transformedFilter) != -1;
  };
}