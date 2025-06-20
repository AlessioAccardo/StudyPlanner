import { Injectable } from "@angular/core";

type UserRole = "guest" | "student" | "professor" | "admin";

@Injectable({
    providedIn: "root"
})
export class AuthService {
    private isAuthenticated = false;

    login() {
        this.isAuthenticated = true;
    }

    logout() {
        this.isAuthenticated = false;
    }

    isLoggedIn(): boolean {
        return this.isAuthenticated;
    }

    private currentUser: {role : UserRole} | null = null;

    login_role(role: UserRole){
        this.currentUser = {role};
    }

    logout_role(){
        this.currentUser = null;
    }

    getRole(): UserRole {
        return this.currentUser?.role || "guest";
    }

    hasRole(requiredRole: string): boolean {
        return this.getRole() === requiredRole;
    }
}