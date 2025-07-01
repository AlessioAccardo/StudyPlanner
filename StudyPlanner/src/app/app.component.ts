import { Component, inject, OnInit} from '@angular/core';
import { RouterOutlet, Router, RouterLink} from '@angular/router';
import { LoggedUser } from './interfaces/loggedUser.interface';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
})
export class AppComponent {
  title = 'SessionManager';

  user: LoggedUser | null = null;

  user$ = inject(AuthService).user$;
  auth = inject(AuthService);
  router = inject(Router);

  logout() {
    this.auth.logout();
  }

 goTo(path: string) {
    this.router.navigate([`/${path}`]);
  }
  
 
}
