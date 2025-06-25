import { Component, OnInit} from '@angular/core';
import { AuthService, UserRole } from '../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: true,
})
export class LoginComponent implements OnInit {

  roles: UserRole[];
  selectedRole: UserRole; //guest di default
  
  display: boolean = false;

  constructor(private authService: AuthService) {
    this.roles =  this.authService.availableRoles;
    this.selectedRole = this.roles[0]; 
  }

  login() {
    this.authService.login(this.selectedRole);
  }

  onRoleChange(index: number){
    this.selectedRole = this.roles[index];
  }

  toggle() {
    this.display = !this.display;
  }

  ngOnInit(){
  }

}
