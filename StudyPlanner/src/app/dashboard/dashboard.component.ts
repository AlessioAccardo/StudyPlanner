import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

interface StudentExam {
  id: string;
  name: string;
  cfu: number;
  completed: boolean;
  note: string;
}

interface ProfessorExamStats {
  id: string;
  name: string;
  passed: number;
  failed: number;
}

interface RichiestaEsame {
  codice: string;
  nome: string;
  cfu: number;
  selezionato: boolean;
  note: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  standalone: true,
  imports: []
})
export class DashboardComponent implements OnInit {
  auth = inject(AuthService);

  tuttiGliEsami: RichiestaEsame[] = [
    {
      codice: 'INF001',
      nome: 'Analisi Matematica II',
      cfu: 12,
      selezionato: false,
      note: 'Propedeutico: Analisi Matematica I'
    },
    {
      codice: 'INF002',
      nome: 'Programmazione Web & Mobile',
      cfu: 9,
      selezionato: false,
      note: ''
    },
    {
      codice: 'INF003',
      nome: 'Basi di Dati',
      cfu: 6,
      selezionato: false,
      note: ''
    },
    {
      codice: 'INF004',
      nome: 'Ingegneria del Software',
      cfu: 6,
      selezionato: false,
      note: 'Propedeutico: Programmazione Web & Mobile'
    }
  ];

  studentExams: StudentExam[] = [];
  professorStats: ProfessorExamStats[] = [];
  richiesteEsami: RichiestaEsame[] = [];

  maxCfu = 0;
  totalCfu = 0;
  completePercentage = 0;

  ngOnInit(): void {
    this.studentExams = [
      { id: "INF001", name: "Analisi Matematica II", cfu: 12, completed: true, note: "Propedeutico: Analisi Matematica I" },
      { id: "INF002", name: "Programmazione Web & Mobile", cfu: 9, completed: true, note: "" },
      { id: "INF003", name: "Basi di Dati", cfu: 6, completed: false, note: "" }
    ];

    this.professorStats = [
      { id: "INF001", name: "Analisi Matematica II", passed: 40, failed: 10 },
      { id: "INF002", name: "Programmazione Web & Mobile", passed: 30, failed: 50 }
    ];

    this.richiesteEsami = [...this.tuttiGliEsami];
    this.calculateStudentMetrics();
  }

  private calculateStudentMetrics(): void {
    this.maxCfu = this.studentExams.reduce((sum, exam) => sum + exam.cfu, 0);
    this.totalCfu = this.studentExams
      .filter(exam => exam.completed)
      .reduce((sum, exam) => sum + exam.cfu, 0);
    this.completePercentage = this.maxCfu > 0 ? (this.totalCfu / this.maxCfu) * 100 : 0;
  }

  getPassPercentage(stats: ProfessorExamStats): number {
    const total = stats.passed + stats.failed;
    return total > 0 ? (stats.passed / total) * 100 : 0;
  }

  getFailPercentage(stats: ProfessorExamStats): number {
    const total = stats.passed + stats.failed;
    return total > 0 ? (stats.failed / total) * 100 : 0;
  }

  confermaAzione(tipo: 'accettare' | 'rifiutare', esame: RichiestaEsame): void {
    const conferma = confirm(`Vuoi veramente ${tipo} l'esame ${esame.nome}?`);
    if (!conferma) return;

    this.richiesteEsami = this.richiesteEsami.filter(e => e.codice !== esame.codice);

    if (tipo === 'accettare') {
      const giàPresente = this.studentExams.some(e => e.id === esame.codice);
      if (!giàPresente) {
        this.studentExams.push({
          id: esame.codice,
          name: esame.nome,
          cfu: esame.cfu,
          completed: true,
          note: esame.note
        });
        this.calculateStudentMetrics();
      }
    }

    alert(`Esame ${tipo === 'accettare' ? 'accettato' : 'rifiutato'} con successo.`);
  }
}
