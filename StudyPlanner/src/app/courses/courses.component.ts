import { Component, OnInit } from '@angular/core';
import { CoursesService, Courses } from '../services/courses.service';
import { StudyPlanService, StudyPlan } from '../services/studyPlan.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-courses',
  imports: [],
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  courses: Courses[] = [];
  studyPlan: StudyPlan[] = [];

  student_id = 2;
  
  constructor(public coursesService: CoursesService, public studyPlanService: StudyPlanService) {}

  ngOnInit() {
    this.coursesService.getAll().subscribe((data) => {
      this.courses = data;
    });
  }
  
  async salvaPiano(courseId: number): Promise<void> {
    try {
      const dto = {
        student_id: this.student_id,
        course_id: courseId
      };

      const created = await firstValueFrom(
        this.studyPlanService.create(dto)
      );

      // il server mi restituisce già { student_id, course_id, course_name, credits, … }
      this.studyPlan.push(created);
      alert(`Corso ${created.course_id} (${created.course_name}, ${created.credits} CFU) aggiunto.`);

    } catch (err) {
      console.error(err);
      alert('Errore durante il salvataggio del piano.');
    }
  }

}
