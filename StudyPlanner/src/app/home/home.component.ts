import { Component, OnInit, inject } from '@angular/core';
import { CoursesService, Courses, CreateCourseDto } from '../services/courses.service';
import { UserService, User} from '../services/user.service';
import { StudyPlanService, StudyPlan } from '../services/studyPlan.service';
import { firstValueFrom } from 'rxjs';
import { LoggedUser } from '../interfaces/loggedUser.interface';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-courses',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  courses: Courses[] = [];
  studyPlan: StudyPlan[] = [];
  professors: User[] = [];

  user: LoggedUser | null = null;

  user$ = inject(AuthService).user$;

  totaleCrediti: number = 0;
  MAX_CFU: number = 180;
  
  constructor(public coursesService: CoursesService, public studyPlanService: StudyPlanService, public userService: UserService) {}

  ngOnInit() {

    const raw = localStorage.getItem('currentUser');
    if (!raw) {
      console.log('Nessun utente in local storage');
    } else {
      this.user = JSON.parse(raw) as LoggedUser;
    }

    if (this.user?.role === 'segreteria') {
      this.userService.getAllProfessors().subscribe((data) => {
        this.professors = data;
      });

      this.coursesService.getAll().subscribe((data) => {
        this.courses = data;
      });
    }

    if (this.user?.role === 'studente') {
      this.studyPlanService.getByStudentId(this.user!.id).subscribe((data) => {
        this.studyPlan = data;
  
        this.totaleCrediti = this.studyPlan
          .filter(course => course.grade !== null)
          .reduce((acc, course) => acc + course.credits, 0);

        this.coursesService.getAll().subscribe((data) => {
          data.filter(course => !this.studyPlan.some(piano => piano.course_id === course.id));
      })
      });


    }

    if (this.user?.role === 'professore') {
      this.coursesService.getByProfessorId(this.user.id).subscribe((data) => {
        this.courses = data;
      })
    }
  }
  
  // CREA CORSO SEGRETERIA
  createCourse(nameInput: HTMLInputElement, prof_id: HTMLSelectElement, creditsInput: HTMLInputElement) {
    const dto: CreateCourseDto = {
      name: nameInput.value,
      professor_id: +prof_id.value,
      credits: +creditsInput.value
    }
    this.coursesService.create(dto).subscribe({
      next: (correct) => {
        alert('Corso creato con successo');
      },
      error: (err) => {
        alert('Errore nella creazione del corso');
      }
    });
  }
  

  salvaPiano(courseId: number) {
    
    if (this.totaleCrediti < 180) {
      const dto = {
        student_id: this.user!.id,
        course_id: courseId
      }

      this.studyPlanService.create(dto).subscribe({
        next: (correct) => {
          alert('Piano aggiunto correttamente');
        },
        error: (err) => {
          alert(`Errore nell'aggiunzione del piano`);
        }
      });
    } else {
      alert('180 CFU raggiunti, congratulazioni!');
    }
  }

}