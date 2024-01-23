import { DataSong } from "../services/data-manager.service";

export const COLUMN_NAMES_MAP: Record<string, string> = {
  "isWinner": "Gagnant",
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

export const NON_FILTER_KEYS = ["isWinner", "platform", "url"]

export function filterPredicateFunction(currentKeys: string[]) {
  return (data: DataSong, filter: string): boolean => {
    // Transform the data into a lowercase string of all property values.
    let dataStr = Object.keys(data).filter((value) => currentKeys.includes(value) && !NON_FILTER_KEYS.includes(value))
      .reduce((currentTerm: string, key: string) => {
        // Use an obscure Unicode character to delimit the words in the concatenated string.
        // This avoids matches where the values of two columns combined will match the user's query
        // (e.g. `Flute` and `Stop` will match `Test`). The character is intended to be something
        // that has a very low chance of being typed in by somebody in a text field. This one in
        // particular is "White up-pointing triangle with dot" from
        // https://en.wikipedia.org/wiki/List_of_Unicode_characters
        return currentTerm + (data as { [key: string]: any })[key] + '◬';
      }, '')
      .toLowerCase();

    // Transform the filter by converting it to lowercase and removing whitespace.
    let transformedFilter = filter.trim().toLowerCase();

    // Remove diacritics
    transformedFilter = transformedFilter.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    dataStr = dataStr.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    return dataStr.indexOf(transformedFilter) != -1;
  };
}

export function getRangeLabel(page: number, pageSize: number, length: number) {
  if (length == 0 || pageSize == 0) {
    return `0 sur ${length}`;
  }
  length = Math.max(length, 0);
  const startIndex = page * pageSize;
  const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
  return `${startIndex + 1} - ${endIndex} sur ${length}`;
}