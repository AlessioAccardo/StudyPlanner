import { Component, OnInit } from '@angular/core';
import { CoursesService, Courses } from '../services/courses.service';
import { StudyPlanService, StudyPlan } from '../services/studyPlan.service';

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
  
  salvaPiano(courseId: number) {
    const plan: StudyPlan = {
      student_id: 2,
      course_id: courseId,
      grade: null
    };

    this.studyPlanService.create(plan).subscribe({
      next: created => {
        this.studyPlan.push(created);
        alert(`Corso ${created.course_id} aggiunto al piano dello studente ${created.student_id}.`);
      },
      error: err => {
        console.log(err);
        alert('Si è verificato un errore durante il salvataggio del piano.');
      }
    });
  }

}
