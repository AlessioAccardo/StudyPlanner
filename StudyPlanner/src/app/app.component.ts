import { Component, inject, effect, OnInit} from '@angular/core';
import { RouterOutlet, Router, RouterLink} from '@angular/router';
//import { AuthService, UserRole} from './services/auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
})
export class AppComponent {
  title = 'SessionManager';

  constructor(
    //private auth: AuthService,
    private router: Router) {}

  /*
  get isLoggedIn(): boolean {
    return this.auth.isLoggedIn();
  }

  get user() {
    return this.auth.user();
  }

  get role(): UserRole | null {
    return this.auth.role();
  }

  

  logout() {
    this.auth.logout();
    this.router.navigate(['login']);
  }
  */
 goTo(path: string) {
    this.router.navigate([`/${path}`]);
  }
}
