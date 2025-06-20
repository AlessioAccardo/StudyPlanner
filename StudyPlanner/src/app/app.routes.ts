import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PlanComponent } from './plan/plan.component';
import { RequestComponent } from './request/request.component';

export const routes: Routes = [
    { path: "home", component: HomeComponent, data: {label: "home", roles: [null, "student", "professor", "admin"]}},
    { path: "", component: HomeComponent, data: {label: "home", roles: [null, "student", "professor", "admin"]}},
    { path: "login", component: LoginComponent, data: {label: "login", roles: [null]}},
    { path: "dashboard", component: DashboardComponent, data: {label: "dashboard", roles:["student", "professor"]}},
    { path: "plan", component: PlanComponent, data: {label: "plan", roles:["student"]}},
    { path: "request", component: RequestComponent, data:{label: "request", roles:["admin"]}}
];
