import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private readonly localStorage = inject(DOCUMENT)?.defaultView?.localStorage;

  public get<T>(key: string): T[] | null {
    const items = this.localStorage?.getItem(key);
    return items ? (JSON.parse(items) as T[]) : [];
  }

  public set(key: string, value: unknown): void {
    this.localStorage?.setItem(key, JSON.stringify(value));
  }

  public remove(key: string): void {
    this.localStorage?.removeItem(key);
  }
}
