import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-no-role',
  standalone: true,
  templateUrl: './no-role.component.html',
  styleUrls: ['./no-role.component.scss']
})
export class NoRoleComponent {
  constructor(private router: Router) {}

  goHome()  { this.router.navigate(['/']); }
  goLogin() { this.router.navigate(['/login']); }
}
