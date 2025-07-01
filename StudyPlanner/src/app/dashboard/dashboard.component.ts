import { Component, inject, OnInit } from '@angular/core'; 
import { LoggedUser } from '../interfaces/loggedUser.interface';
import { AuthService } from '../services/auth/auth.service';
import { CommonModule } from '@angular/common';

interface StudentExam {
  id: string;
  name: string;
  cfu: number;
  completed: boolean;
  note: string;
  voto?: number;
  votoAccettato?: boolean;
}

interface ProfessorExamStats {
  id: string;
  name: string;
  passed: number;
  failed: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  standalone: true,
  imports: [CommonModule]
})
export class DashboardComponent implements OnInit {


  user: LoggedUser | null = null;

  user$ = inject(AuthService).user$;

  studentExams: StudentExam[] = [];
  professorStats: ProfessorExamStats[] = [];
  maxCfu = 0;
  totalCfu = 0;
  completePercentage = 0;

  ngOnInit(): void {
    const raw = localStorage.getItem('currentUser');
    if (!raw) {
      console.log('Nessun utente in local storage');
    } else {
      this.user = JSON.parse(raw) as LoggedUser;
    }
    
    this.studentExams = [
      { id: "INF001", name: "Analisi Matematica II", cfu: 12, completed: true, note: "Propedeutico: Analisi Matematica I", voto: 28, votoAccettato: undefined },
      { id: "INF002", name: "Programmazione Web & Mobile", cfu: 9, completed: true, note: "", voto: 30, votoAccettato: undefined },
      { id: "INF003", name: "Basi di Dati", cfu: 6, completed: false, note: "" }
    ];

    this.professorStats = [
      { id: "INF001", name: "Analisi Matematica II", passed: 40, failed: 10 },
      { id: "INF002", name: "Programmazione Web & Mobile", passed: 30, failed: 50 }
    ];

    this.calculateStudentMetrics();
  }

  private calculateStudentMetrics(): void {
    this.maxCfu = this.studentExams.reduce((sum, exam) => sum + exam.cfu, 0);
    this.totalCfu = this.studentExams
      .filter(exam => exam.completed)
      .reduce((sum, exam) => sum + exam.cfu, 0);
    this.completePercentage = this.maxCfu > 0 ? (this.totalCfu / this.maxCfu) * 100 : 0;
  }

  accettaVoto(exam: StudentExam): void {
    if (
      confirm(`Vuoi accettare il voto di ${exam.name} - ${exam.cfu} CFU?`)
    ) {
      exam.votoAccettato = true;
      exam.completed = true;
      this.calculateStudentMetrics();
      alert('Voto accettato con successo!');
    }
  }

  rifiutaVoto(exam: StudentExam): void {
    if (
      confirm(`Vuoi rifiutare il voto di ${exam.name} - ${exam.cfu} CFU?`)
    ) {
      exam.votoAccettato = false;
      exam.completed = false;
      this.calculateStudentMetrics();
      alert('Voto rifiutato con successo!');
    }
  }

  getPassPercentage(stats: ProfessorExamStats): number {
    const total = stats.passed + stats.failed;
    return total > 0 ? (stats.passed / total) * 100 : 0;
  }

  getFailPercentage(stats: ProfessorExamStats): number {
    const total = stats.passed + stats.failed;
    return total > 0 ? (stats.failed / total) * 100 : 0;
  }
}
