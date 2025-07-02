import { Component, OnInit, inject } from '@angular/core';
import { ExamService, Exam } from '../services/exam.service';
import { Router } from '@angular/router';
import { StudyPlan, StudyPlanService } from '../services/studyPlan.service';
import { Observable, firstValueFrom } from 'rxjs';
import { EnrolledStudent, EnrolledStudentsService, EnrolledStudentDto } from '../services/enrolledStudents.service';
import { LoggedUser } from '../interfaces/loggedUser.interface';
import { AuthService } from '../services/auth/auth.service';
AuthService

@Component({
  selector: 'app-plan',
  standalone: true,
  imports: [],
  templateUrl: './plan.component.html',
  styleUrl: './plan.component.scss'
})

export class PlanComponent implements OnInit{
  router = inject(Router);

  user: LoggedUser | null = null;
  
  user$ = inject(AuthService).user$;

  esami: Exam[] = [];
  studyPlan: StudyPlan[] = [];
  student_id = 2;

  constructor(public examService: ExamService, public studyPlanService: StudyPlanService, public enrolledStudentService: EnrolledStudentsService) {}

  ngOnInit() {

    const raw = localStorage.getItem('currentUser');
    if (!raw) {
      console.log('Nessun utente in local storage');
    } else {
      this.user = JSON.parse(raw) as LoggedUser;
    }

    this.examService.getExamByProfessorId(1).subscribe((data:Exam[]) => {
      this.esami = data;
    });

    this.loadStudyPlan();
  }


  searchText: string = '';

  getExamByCode(code: number): Observable<Exam> {
    return this.examService.getExamByCode(code)
  }

  seleziona(code: number) {
    const dto: EnrolledStudentDto = {
      student_id: this.user!.id,
      exam_code: code
    }
    this.enrolledStudentService.enrollStudent(dto);
  }

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchText = input.value;
  }

  get cfuTotali(): number {
    return this.esami.reduce((tot, e) => tot + e.credits, 0);
  }

  private loadStudyPlan() {
    this.studyPlanService.getByStudentId(this.user!.id).subscribe((data) => {
      this.studyPlan = data;
    });
  }

  salvaPiano(courseId: number) {}

}