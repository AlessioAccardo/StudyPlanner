import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PlanComponent } from './plan/plan.component';
import { RequestComponent } from './request/request.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CoursesComponent } from './courses/courses.component';
import { NoRoleComponent } from './no-role/no-role.component';   
import { authGuard } from './guard/auth.guard';

export const routes: Routes = [
    { path: "", redirectTo: "home", pathMatch: "full"},
    { path: "login", component: LoginComponent },
    
    { path: "home", component: HomeComponent, canActivate: [authGuard]},
    { path: "dashboard", component: DashboardComponent, canActivate: [authGuard] },
    { path: "plan", component: PlanComponent, canActivate: [authGuard] },
    { path: "request", component: RequestComponent, canActivate: [authGuard] },
    { path: "courses", component: CoursesComponent, canActivate: [authGuard] },
    
    
    { path: "no-role", component: NoRoleComponent },
    { path: "**", component: PageNotFoundComponent }    // wild card routing: se nessuna route sopra matcha con la url richiesta allora attiva questo path
];
