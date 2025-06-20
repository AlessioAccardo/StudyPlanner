import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService, UserRole } from '../services/auth.service';
import { User } from '../models/user.model';

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
  constructor(
    private authService: AuthService,
  ){
    this.roles =  this.authService.availableRoles;
    this.selectedRole = this.roles[0]; 
  }

  login() {
    this.authService.login(this.selectedRole);
  }

  onRoleChange(index: number){
    this.selectedRole = this.roles[index];
  }


  ngOnInit(){
  }

}
