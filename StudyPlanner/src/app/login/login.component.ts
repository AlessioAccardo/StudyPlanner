import { Component, inject } from '@angular/core';
import { AuthService, UserRole } from '../services/auth/auth.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthApiService } from '../services/auth/authApi.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: true,
})

export class LoginComponent {
  loginForm: FormGroup;
  registrationForm: FormGroup;
  errorMessage: string | null = null;
  roles: UserRole[] = [
    UserRole.studente,
    UserRole.professore,
    UserRole.admin
  ]

  selectedRole: UserRole = UserRole.studente;
  display: boolean = false;

  router = inject(Router);

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private authApiService: AuthApiService
  ) {
    this.loginForm = this.fb.group({
      email:    ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.registrationForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email:    ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: [this.selectedRole, Validators.required]
    });
  }

  onSubmit(): void {

    if (!this.display) {
      if (this.loginForm.invalid) {
      return;
      }
      const { email, password } = this.loginForm.value;
      this.authApiService.login({ email, password })
      .subscribe({
        next: res => {
          localStorage.setItem('currentUser', JSON.stringify(res.data));
          localStorage.setItem('token', res.token);
          console.log('Current user: ', JSON.stringify(res.data));
          alert('Login avvenuto con successo');
          this.router.navigateByUrl('home');
        },
        error: err => {
          // gestisci l’errore (es. credenziali sbagliate)
          this.errorMessage = err.error?.message || 'Errore di login';
          alert(this.errorMessage);
        }
      });
    } else {
      if (this.registrationForm.invalid) {
      return;
      }
      const { first_name, last_name, email, password, role } = this.registrationForm.value
      this.authApiService.register({ first_name, last_name, email, password, role })
      .subscribe({
        next: res => {
          console.log('RISPOSTA REGISTRAZIONE: ', res);
          localStorage.setItem('currentUser', JSON.stringify(res.data));
          localStorage.setItem('token', res.token);
          console.log('Current user: ', JSON.stringify(res.data));
          alert('Registrazione avvenuta con successo');
          this.router.navigateByUrl('home');
        }, error: err => {
          this.errorMessage = err.error?.message || 'Errore nella registrazione';
          alert(this.errorMessage);
        }
      });
    }
    
  }

  toggle() {
    this.display = !this.display;
  }

  onRoleChange(selectedIndex: number) {
    this.selectedRole = this.roles[selectedIndex];
    this.registrationForm.get('role')!.setValue(this.selectedRole);
  }
}
