import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: "",
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent),
    data: { label: "home", roles: ["guest", "student", "professor", "admin"] }
  },
  {
    path: "login",
    loadComponent: () => import('./login/login.component').then(m => m.LoginComponent),
    data: { label: "login", roles: ["guest"] }
  },
  {
    path: "dashboard",
    loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent),
    data: { label: "dashboard", roles: ["student", "professor"] }
  },
  {
    path: "plan",
    loadComponent: () => import('./plan/plan.component').then(m => m.PlanComponent),
    data: { label: "plan", roles: ["student"] }
  },
  {
    path: "request",
    loadComponent: () => import('./request/request.component').then(m => m.RequestComponent),
    data: { label: "request", roles: ["admin"] }
  }
];

