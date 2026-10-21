import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private readonly tokenKey = 'access_token';
  private readonly userKey = 'current_user';

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  setUser(user: unknown): void {
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  getUser<T>(): T | null {
    const user = localStorage.getItem(this.userKey);

    return user ? JSON.parse(user) : null;
  }

  removeUser(): void {
    localStorage.removeItem(this.userKey);
  }

  clear(): void {
    this.removeToken();
    this.removeUser();
  }
}
