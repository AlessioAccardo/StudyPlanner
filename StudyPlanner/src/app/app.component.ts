import { Component, inject, effect, OnInit} from '@angular/core';
import { RouterOutlet, Router, RouterLink} from '@angular/router';
import { LoggedUser } from './interfaces/loggedUser.interface';
//import { AuthService, UserRole} from './services/auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
})
export class AppComponent implements OnInit {

   user: LoggedUser = {
      id: 0,
      first_name: "",
      last_name: "",
      email: "",
      role: "",
      credits: 0,
      mean: 0
    }
  title = 'SessionManager';
 ngOnInit(): void {
     const raw = localStorage.getItem('currentUser');
    if (!raw) {
      console.log('Nessun utente in local storage');
    } else {
      this.user = JSON.parse(raw) as LoggedUser;
    }
    
    
  }
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
