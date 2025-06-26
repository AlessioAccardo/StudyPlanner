import { Injectable, signal, computed } from "@angular/core";
import { AuthApiService, AuthResponse, LoginPayload } from "./authApi.service";
import { tap } from "rxjs/operators";
import { Observable, of } from "rxjs";

export enum UserRole {
  studente   = 'studente',
  professore = 'professore',
  admin     = 'admin'
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

  private _user  = signal<AuthResponse['user'] | null>(null);
  private _token = signal<string | null>(null);

  readonly user        = this._user.asReadonly();
  readonly isLoggedIn  = computed(() => !!this._token());
  readonly role        = computed(() => this._user()?.role ?? null);

  constructor(private api: AuthApiService) {
    const saved = localStorage.getItem(this.TOKEN_KEY);
    if (saved) {
      this._token.set(saved);
      this.me().subscribe({ error: () => this.logout() });
    }
  }

  login(payload: LoginPayload): Observable<AuthResponse> {
    return this.api.login(payload).pipe(
      tap(res => {
        this._token.set(res.token);
        localStorage.setItem(this.TOKEN_KEY, res.token);
        this._user.set(res.user);
      })
    );
  }

  logout(): void {
    this._token.set(null);
    this._user.set(null);
    localStorage.removeItem(this.TOKEN_KEY);
  }

  me(): Observable<AuthResponse['user']> {
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
