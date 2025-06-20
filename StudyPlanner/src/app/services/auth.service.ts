import { Injectable, signal } from "@angular/core";

export type UserRole = "student" | "professor" | "admin" | null;
export const ALL_ROLES: UserRole[] = ["student", "professor", "admin"];
@Injectable({
    providedIn: "root"
})


export class AuthService {
    public _role = signal<UserRole>(null);

    readonly userRole = this._role.asReadonly();
    
    private _loggedIn = signal(false);
    readonly isLoggedIn = this._loggedIn.asReadonly();
    readonly availableRoles: UserRole[] = ALL_ROLES;

    login(role: UserRole) {
        this._role.set(role);
        this._loggedIn.set(true);
    }

    logout() {
        this._role.set(null);
        this._loggedIn.set(false);
    }

    hasRole(required: UserRole){
        return this._role() === required;
    }

}