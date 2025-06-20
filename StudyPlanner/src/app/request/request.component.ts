import { Component, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-request',
  imports: [],
  templateUrl: './request.component.html',
  styleUrl: './request.component.scss',
  standalone: true,
})
export class RequestComponent {
  auth = inject(AuthService);
}
