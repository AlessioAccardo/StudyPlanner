import { Component, inject, Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthApiService } from '../services/auth/authApi.service';
import { UserRole } from '../services/auth/authApi.service';
import { TitleCasePipe, isPlatformBrowser } from '@angular/common';
import { AuthService } from '../services/auth/auth.service';
import { LoggedUser } from '../interfaces/loggedUser.interface';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  providers: [TitleCasePipe],
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
    UserRole.segreteria
  ]

  display: boolean = false;

  router = inject(Router);
  private titleCase = new TitleCasePipe();
  private isBrowser!: boolean;

  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    private fb: FormBuilder,
    private authApiService: AuthApiService,
    private auth: AuthService
  ) {

    this.isBrowser = isPlatformBrowser(platformId);

    this.loginForm = this.fb.group({
      email:    ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.registrationForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email:    ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['studente', Validators.required]
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
          this.auth.login(res.data as LoggedUser, res.token);          
        },
        error: err => {
          this.errorMessage = err.error?.message || 'Errore di login';
          alert(this.errorMessage);
        }
      });
    } else {
      if (this.registrationForm.invalid) {
      return;
      }
      if (this.isBrowser) {
        let { first_name, last_name, email, password, role } = this.registrationForm.value;
        first_name = this.titleCase.transform(first_name);
        last_name = this.titleCase.transform(last_name);
        this.authApiService.register({ first_name, last_name, email, password, role })
        .subscribe({
          next: res => {
            localStorage.setItem('currentUser', JSON.stringify(res.data));
            localStorage.setItem('token', res.token);
            alert('Registrazione avvenuta con successo');
            this.router.navigateByUrl('home');
          }, error: err => {
            this.errorMessage = err.error?.message || 'Errore nella registrazione';
            alert(this.errorMessage);
          }
        });
      } else {
        console.log('Errore per localStorage is browser: ', this.isBrowser);
      }

    }
    
  }

  toggle() {
    this.display = !this.display;
  }

  onRoleChange(selectedIndex: number) {
    const selectedRole = this.roles[selectedIndex];
    this.registrationForm.get('role')!.setValue(selectedRole);
  }
}
