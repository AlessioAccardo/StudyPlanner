import { Component } from '@angular/core';
import { CoursesService, Courses } from '../services/courses.service';

@Component({
  selector: 'app-courses',
  imports: [],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent {
  courses: Courses[] = [];
  
  constructor(public coursesService: CoursesService) {}

  ngOnInit() {
    this.coursesService.getAll().subscribe((data) => {
      this.courses = data;
    })
  }
}
