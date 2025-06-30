import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ExamService, Exam, CreateExamDto } from '../services/exam.service';
import { CoursesService, Courses } from '../services/courses.service';

@Component({
  selector: 'app-request',
  imports: [],
  templateUrl: './request.component.html',
  styleUrl: './request.component.scss',
  standalone: true,
})
export class RequestComponent implements OnInit {
  router = inject(Router);

  requests: Exam[] = [];
  courses: Courses[] = [];

  constructor(private examService: ExamService, private coursesService: CoursesService) {}

  ngOnInit(): void {
    this.loadRequests();
    this.coursesService.getByProfessorId(1).subscribe((data) => {
      this.courses = data;
    });
  }

  onSubmit(courseInput: HTMLSelectElement, dateInput: HTMLInputElement) {
    const dto: CreateExamDto = {
      course_id: +courseInput.value,
      date: dateInput.value
    };

    this.examService.createExam(dto).subscribe({
      next: (createdExam) => {
        console.log('Esame creato: ', createdExam);
        alert(`Esame ${createdExam.name} creato con ID ${createdExam.code}`);
        courseInput.selectedIndex = 0;
        dateInput.value = "";
        this.loadRequests();
      },
      error: err => {
        console.log(err);
        alert(`Errore nella creazione dell'esame`);
      }
    });
  }

  loadRequests() {
    this.examService.getExamRequests().subscribe((data) => {
      this.requests = data;
    });
  }

  approveRequest(code: number, approved: boolean) {
    const msg = approved
      ? 'Vuoi davvero approvare questa richiesta di esame?'
      : 'Vuoi davvero rifiutare questa richiesta di esame?';
    if (!confirm(msg)) return;

    this.examService.approveExam(code, approved).subscribe({
      next: (approvedExam) => {
        const req = this.requests.find(r => r.code === code);
        if (req) {
          req.approved = approved;
        }
        if (approved) {
          alert(`Richiesta creazione esame ${approvedExam.name} approvata!`);
        } else {
          alert(`Richiesta creazione esame ${approvedExam.name} rifiutata!`);
        }
      },
      error: err => {
        console.log(err);
        alert(`Errore nell'approvazione dell'esame`);
      }
    });
  }
}
