import { Component, OnInit, inject } from '@angular/core';
import { ExamService, Exam } from '../services/exam.service';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plan',
  standalone: true,
  imports: [],
  templateUrl: './plan.component.html',
  styleUrl: './plan.component.scss'
})

export class PlanComponent implements OnInit{
  auth = inject(AuthService);
  router = inject(Router);

  esami: Exam[] = [];

  constructor(public examService: ExamService) {
    //if (!this.auth.role || this.auth.role() !== "studente") {
    //  this.router.navigate(['/page-not-found']); 
    //}
  }

  ngOnInit() {
      this.examService.getExamByProfessorId(1).subscribe((data:Exam[]) => {
      console.log(data);
      this.esami = data;
    });
  }
   

  searchText: string = '';

  get esamiFiltrati() {
    if (!this.searchText.trim()) return this.esami;
    return this.esami.filter(e =>
      `${e.code} ${e.name}`.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchText = input.value;
  }

  get esamiSelezionati() {
    return this.esami.filter(e => e.selezionato);
  }

  get cfuTotali(): number {
    return this.esamiSelezionati.reduce((tot, e) => tot + e.credits, 0);
  }

  salvaPiano(event: Event): void {
    event.preventDefault();
    alert(`Hai salvato ${this.esamiSelezionati.length} esami per un totale di ${this.cfuTotali} CFU.`);
  }

  aggiornaSelezione(event: Event, esameCodice: number) {
    const input = event.target as HTMLInputElement;
    const esame = this.esami.find(e => e.code === esameCodice);
    if (esame) {
      esame.selezionato = input.checked;
    }
  }
}