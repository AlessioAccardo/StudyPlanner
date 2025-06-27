import { Component } from '@angular/core';
import { AuthService, UserRole } from '../services/auth/auth.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: true,
})

export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;
  roles: UserRole[] = [
    UserRole.studente,
    UserRole.professore,
    UserRole.admin
  ]

  selectedRole: UserRole = UserRole.studente;
  display: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService   // ← iniettiamo AuthService
  ) {
    this.loginForm = this.fb.group({
      email:    ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    const { email, password } = this.loginForm.value;
    this.authService.login({ email, password })
      .subscribe({
        next: res => {
          // login OK: puoi ad esempio navigare alla dashboard
          console.log('Token:', res.token);
        },
        error: err => {
          // gestisci l’errore (es. credenziali sbagliate)
          this.errorMessage = err.error?.message || 'Errore di login';
        }
      });
  }

  toggle() {
    this.display = !this.display;
  }

  onRoleChange(selectedIndex: number) {
    this.selectedRole = this.roles[selectedIndex];
  }
}
