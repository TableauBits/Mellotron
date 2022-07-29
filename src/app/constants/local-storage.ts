import { DEFAULT_COLUMNS_ORDER } from "./table"

export const LOCAL_STORAGE_VERSION = "v3";

export enum LocalStorageKey {
  TABLE_COLUMN_ORDER = "mellotron.setting.tableColumnOrder",
  TABLE_DISPLAYED_COLUMNS = "mellotron.setting.tableDisplayedColumns",
  TABLE_PAGE_SIZE_KEY = "mellotron.setting.tablePageSize",
  VERSION = "mellotron.setting.version",
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
    key: LocalStorageKey.TABLE_DISPLAYED_COLUMNS,
    value: JSON.stringify(DEFAULT_COLUMNS_ORDER),
  },
  {
    key: LocalStorageKey.TABLE_PAGE_SIZE_KEY,
    value: "5",
  },
  {
    key: LocalStorageKey.VERSION,
    value: LOCAL_STORAGE_VERSION
  }
]