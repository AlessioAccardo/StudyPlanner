import { Component, OnInit, inject, signal } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';   

type ExamRequest = {
  id?: string;
  course: string;
  date: string;
  session: "Invernale" | "Estiva" | "Autunnale";
  status?: "pending" | "approved" | "rejected";
}

@Component({
  selector: 'app-request',
  imports: [ReactiveFormsModule, DatePipe],
  templateUrl: './request.component.html',
  styleUrl: './request.component.scss',
  standalone: true,
})
export class RequestComponent implements OnInit {
  private http = inject(HttpClient);
  auth = inject(AuthService);
  fb = inject(FormBuilder);
  router = inject(Router); 

  requestForm!: FormGroup;
  requests = signal<ExamRequest[]>([]);
  private baseUrl = "/api/requests";

  ngOnInit(): void {
    if (!this.auth.role || this.auth.role() !== 'admin') {
      this.router.navigate(['/no-role']);
      return;
    }

    this.requestForm = this.fb.group({
      course: ['', Validators.required],
      date: ['', Validators.required],
      session: ['Estiva', Validators.required],
    });

    if (this.auth.role() === 'admin') {
      this.loadRequests();
    }
  }

  onSubmit() {
    // bisogna aggiungere la tabella delle Richieste nel backend e puntare a quella per effettuare la richiesta
    if (this.requestForm.invalid) return;
    const payload: Partial<ExamRequest> = this.requestForm.value;

    this.http.post<ExamRequest>(this.baseUrl, payload).subscribe({
      next: newReq => {},
      error: (err) => {
        console.error('Dettagli errore HTTP:', err);
        alert(`Errore invio richiesta: ${err.status}  ${err.message}`);
      }
    });
  }

  loadRequests() {
    this.http.get<ExamRequest[]>(this.baseUrl).subscribe({
      next: reqs => this.requests.set(reqs),
      error: () => console.error('Errore caricamento richieste')
    });
  }

  updateStatus(req: ExamRequest, status: 'approved' | 'rejected') {
    if (!req.id) return;
    this.http.patch<ExamRequest>(`${this.baseUrl}/${req.id}`, { status })
      .subscribe({
        next: updated => {
          this.requests.update(list =>
            list.map(r => r.id === updated.id ? updated : r)
          );
        },
        error: () => alert('Errore aggiornamento stato')
      });
  }
}
