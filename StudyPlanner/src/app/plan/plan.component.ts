import { Component, OnInit, inject } from '@angular/core';
import { ExamService, Exam } from '../services/exam.service';
import { Router } from '@angular/router';
import { StudyPlan, StudyPlanService } from '../services/studyPlan.service';
import { Observable, firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-plan',
  standalone: true,
  imports: [],
  templateUrl: './plan.component.html',
  styleUrl: './plan.component.scss'
})

export class PlanComponent implements OnInit{
  router = inject(Router);

  esami: Exam[] = [];
  studyPlan: StudyPlan[] = [];
  student_id = 2;

  constructor(public examService: ExamService, public studyPlanService: StudyPlanService) {
    //if (!this.auth.role || this.auth.role() !== "studente") {
    //  this.router.navigate(['/page-not-found']); 
    //}
  }

  ngOnInit() {
    this.examService.getExamByProfessorId(1).subscribe((data:Exam[]) => {
      console.log(data);
      this.esami = data;
    });
    this.loadStudyPlan();
  }


  searchText: string = '';

  getExamByCode(code: number): Observable<Exam> {
    return this.examService.getExamByCode(code)
  }

  async seleziona(code: number) {
    try {
      const exam: Exam = await firstValueFrom(this.examService.getExamByCode(code));
      let current_exam = exam;
      this.esami.push(current_exam);
    } catch (err) {
      console.log(err);
    }
  }

  get esamiFiltrati() {
    if (!this.searchText.trim()) return this.esami;
    return this.esami.filter(e =>
      ${e.code} ${e.name}.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchText = input.value;
  }

  get cfuTotali(): number {
    return this.esami.reduce((tot, e) => tot + e.credits, 0);
  }

  private loadStudyPlan() {
    this.studyPlanService.getByStudentId(this.student_id).subscribe((data) => {
      this.studyPlan = data
    });
  }

  salvaPiano(courseId: number) {}

}