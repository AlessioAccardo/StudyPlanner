import { Injectable, signal, computed, Inject, PLATFORM_ID } from "@angular/core";
import { isPlatformBrowser } from '@angular/common';
import { AuthApiService, AuthResponse, LoginDetails } from "./authApi.service";
import { tap } from "rxjs/operators";
import { Observable, of } from "rxjs";

export enum UserRole {
  studente   = 'studente',
  professore = 'professore',
  admin      = 'admin'
}

// tutti i ruoli possibili
export const ALL_ROLES: UserRole[] = [
  UserRole.studente,
  UserRole.professore,
  UserRole.admin
];

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';

  private _user  = signal<AuthResponse['data'] | null>(null);
  private _token = signal<string | null>(null);

  readonly user        = this._user.asReadonly();
  readonly isLoggedIn  = computed(() => !!this._token());
  readonly role        = computed(() => this._user()?.role ?? null);

  private isBrowser: boolean;

  constructor(
    private api: AuthApiService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);

    if (this.isBrowser) {
      const saved = localStorage.getItem(this.TOKEN_KEY);
      if (saved) {
        this._token.set(saved);
        this.me().subscribe({ error: () => this.logout() });
      }
    }
  }

  login(payload: LoginDetails): Observable<AuthResponse> {
    return this.api.login(payload).pipe(
      tap(res => {
        this._token.set(res.token);
        if (this.isBrowser) {
          localStorage.setItem(this.TOKEN_KEY, res.token);
        }
        this._user.set(res.data);
      })
    );
  }

  logout(): void {
    this._token.set(null);
    this._user.set(null);
    if (this.isBrowser) {
      localStorage.removeItem(this.TOKEN_KEY);
    }
  }

  me(): Observable<AuthResponse['data']> {
    const token = this._token();
    if (!token) return of(null as any);
    return this.api.me().pipe(tap(user => this._user.set(user)));
  }

  hasRole(required: UserRole | null): boolean {
    const user = this._user();
    if (!user) return false;
    return user.role === required;
  }
}
