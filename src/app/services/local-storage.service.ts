import { Injectable } from '@angular/core';
import { LocalStorageKey } from '../constants/local-storage';

type LocalStorageItem = {
  key: LocalStorageKey
  value: string
}

const INITIAL_LOCAL_STORAGE: LocalStorageItem[] = [
  {
    key: LocalStorageKey.TABLE_PAGE_SIZE_KEY,
    value: "5",
  }
]

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { this.init() }

  private init() {
    INITIAL_LOCAL_STORAGE.forEach((item) => {
      if (localStorage.getItem(item.key) === null) {
        localStorage.setItem(item.key, item.value);
      }
    })
  }

  get(key: LocalStorageKey): string {
    const value = localStorage.getItem(key);
    return value ? value : "";
  }

  set(key: LocalStorageKey, value: string) {
    localStorage.setItem(key, value);
  }
}
