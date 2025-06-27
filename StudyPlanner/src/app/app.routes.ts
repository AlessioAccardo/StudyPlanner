import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PlanComponent } from './plan/plan.component';
import { RequestComponent } from './request/request.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CoursesComponent } from './courses/courses.component';
import { NoRoleComponent } from './no-role/no-role.component';   

export const routes: Routes = [
    { path: "home", component: HomeComponent, data: {label: "home", roles: [null, "student", "professor", "admin"]}},
    { path: "", component: HomeComponent, data: {label: "home", roles: [null, "student", "professor", "admin"]}},
    { path: "login", component: LoginComponent, data: {label: "login", roles: [null]}},
    { path: "dashboard", component: DashboardComponent, data: {label: "dashboard", roles:["student", "professor"]}},
    { path: "plan", component: PlanComponent, data: {label: "plan", roles:["student"]}},
    { path: "request", component: RequestComponent, data:{label: "request", roles:["admin"]}},
    { path: "no-role", component: NoRoleComponent },         
    { path: "courses", component: CoursesComponent, data: {label: "courses", roles: ["student", "professor", "admin"]}},
    { path: "**", component: PageNotFoundComponent }    // wild card routing: se nessuna route sopra matcha con la url richiesta allora attiva questo path
];
