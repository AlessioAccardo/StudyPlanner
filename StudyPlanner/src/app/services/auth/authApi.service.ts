import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { UserRole } from "./auth.service";

export interface LoginPayload {
    email: string;
    password: string;
}

export interface AuthResponse {
    token: string;
    user: {
        first_name: string;
        last_name: string;
        role: UserRole | null;
    }
}

@Injectable({ providedIn: 'root'})
export class AuthApiService {
    private apiUrl = 'http://localhost:3000/api/auth';

    constructor(private http: HttpClient) {}

    login(payload: LoginPayload): Observable<AuthResponse> {
      return this.http.post<AuthResponse>(`${this.apiUrl}/login`, payload);
    }

    logout(): Observable<void> {
      return this.http.post<void>(`${this.apiUrl}/logout`, {});
    }

    me(): Observable<AuthResponse['user']> {
      return this.http.get<AuthResponse['user']>(`${this.apiUrl}/me`);
    }
}