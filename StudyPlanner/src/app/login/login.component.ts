import { Component, inject} from '@angular/core';
import { AuthService, UserRole } from '../services/auth/auth.service';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: true,
})
export class LoginComponent {

  
  
  display: boolean = false;

  toggle() {
    this.display = !this.display;
  }



}
