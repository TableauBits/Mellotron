const DEFAULT_COLUMNS_ORDER = ["id", "title", "author", "user", "cstName", "date", "platform", "url"];

export enum LocalStorageKey {
  TABLE_COLUMN_ORDER = "mellotron.setting.tableColumnOrder",
  TABLE_PAGE_SIZE_KEY = "mellotron.setting.tablePageSize",
}

type LocalStorageItem = {
  key: LocalStorageKey
  value: string
}

export const INITIAL_LOCAL_STORAGE: LocalStorageItem[] = [
  {
    key: LocalStorageKey.TABLE_COLUMN_ORDER,
    value: JSON.stringify(DEFAULT_COLUMNS_ORDER),
  },
  {
    key: LocalStorageKey.TABLE_PAGE_SIZE_KEY,
    value: "5",
  },
]