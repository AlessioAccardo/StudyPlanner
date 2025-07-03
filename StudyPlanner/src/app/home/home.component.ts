import { Component, OnInit, inject } from '@angular/core';
import { CoursesService, Courses, CreateCourseDto } from '../services/courses.service';
import { UserService, User} from '../services/user.service';
import { StudyPlanService, StudyPlan } from '../services/studyPlan.service';
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

  // PER STUDENTE
  libretto: boolean = true
  totalCredits: number = 0;
  MAX_CFU: number = 180;
  studentWeightedMean: number = 0;
  private creditMap: Map<number, number>
  
  constructor(public coursesService: CoursesService, public studyPlanService: StudyPlanService, public userService: UserService) {
    this.creditMap = new Map();
  }

  ngOnInit() {

    // OTTENGO L'OGGETTO USER
    const raw = localStorage.getItem('currentUser');
    if (!raw) {
      console.log('Nessun utente in local storage');
    } else {
      this.user = JSON.parse(raw) as LoggedUser;
    }

    // SEGRETERIA
    if (this.user?.role === 'segreteria') {
      this.userService.getAllProfessors().subscribe((data) => {
        this.professors = data;
      });

      this.coursesService.getAll().subscribe((data) => {
        this.courses = data;
      });
    }

    // STUDENTE
    if (this.user!.role === 'studente') {
      this.loadStudyPlan();
      this.loadStudentCourses();
    }

    // PROFESSORE
    if (this.user?.role === 'professore') {
      this.coursesService.getByProfessorId(this.user.id).subscribe((data) => {
        this.courses = data;
      });
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

  // AGGIUNZIONE CORSO DA PARTE DELLO STUDENTE
  salvaPiano(courseId: number) {
    
    if (this.totalCredits < 180) {
      const dto = {
        student_id: this.user!.id,
        course_id: +courseId
      }

      this.studyPlanService.create(dto).subscribe({
        next: () => {
          alert('Piano aggiunto correttamente');
          this.courses = this.courses.filter(c => c.id !== courseId);
          this.studyPlan.push;
          this.loadStudyPlan;
          this.loadStudentCourses();
          
        },
        error: () => {
          alert(`Errore nell'aggiunzione del piano`);
        }
      });
    } else {
      alert('180 CFU raggiunti, congratulazioni!');
    }
  }

  // MEDIA PESATA STUDENTE
  weightedMeanCompute() {
    let weightedSum = 0;

    for (const record of this.studyPlan) {
      if (record.grade !== null) {
        const element = this.creditMap.get(record.course_id);
        if (element) {
          weightedSum += record.grade * element;
        }
      }
    }
    this.studentWeightedMean = (this.totalCredits > 0) ? (weightedSum / this.totalCredits) : 0;
  }

  visualizzaCorsi() {
    this.libretto = !this.libretto;
  }


  // CARICA PIANO STUDENTE
  loadStudyPlan() {
    this.studyPlanService.getByStudentId(this.user!.id).subscribe((plan) => {
        this.studyPlan = plan;
        this.totalCredits = this.studyPlan
          .filter(course => course.grade !== null)
          .reduce((acc, course) => acc + course.credits, 0);
    });
  }

  // CARICA CORSI CHE LO STUDENTE PUO AGGIUNGERE
  loadStudentCourses() {
    this.coursesService.getCompStudent(this.user!.id).subscribe((course) => {
        this.courses = course;
        this.creditMap = new Map(this.courses.map(c => [c.id, c.credits]));
        this.weightedMeanCompute();
    });
  }
}