import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { StorageService } from './storage';
import { environment } from '../../../environments/environment';
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from '../../shared/models/auth.model';
import { Observable, tap } from 'rxjs';
import { Student } from '../../shared/models/student.model';
import { User } from '../../shared/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly storageService = inject(StorageService);
  private readonly apiUrl = `${environment.api_url}/auth`;

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap((response) => {
        this.storageService.setToken(response.data.access_token);
        this.storageService.setUser(response.data.account);
      }),
    );
  }

  register(data: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.apiUrl}/register`, data).pipe(
      tap((response) => {
        this.storageService.setToken(response.data.access_token);
        this.storageService.setUser(response.data.account);
      }),
    );
  }

  adminLogin(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/admin/login`, credentials).pipe(
      tap((response) => {
        this.storageService.setToken(response.data.access_token);
        this.storageService.setUser(response.data.account);
      }),
    );
  }

  logout(): void {
    this.storageService.clear();
  }

  isLoggedIn(): boolean {
    return !!this.storageService.getToken();
  }

  getToken(): string | null {
    return this.storageService.getToken();
  }

  getCurrentStudent(): Student | null {
    return this.storageService.getUser<Student>();
  }

  getCurrentUser(): User | null {
    return this.storageService.getUser<User>();
  }
}
