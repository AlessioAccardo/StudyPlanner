import { Component, OnInit } from '@angular/core';
import { CoursesService, Courses, CreateCourseDto } from '../services/courses.service';
import { UserService, User} from '../services/user.service';
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
  professors: User[] = [];
  professorMap: Record<number, User> = {};

  student_id = 2;
  
  constructor(public coursesService: CoursesService, public studyPlanService: StudyPlanService, public userService: UserService) {}

  ngOnInit() {
    this.coursesService.getAll().subscribe((data) => {
      this.courses = data;
    });

    this.userService.getAllProfessors().subscribe((data) => {
      this.professors = data;
      this.professorMap = data.reduce((m, p) => {
        m[p.id] = p;
        return m;
      }, {} as Record<number, User>);
    });

  }
  
  async createCourse(nameInput: HTMLInputElement, prof_id: HTMLSelectElement, creditsInput: HTMLInputElement): Promise<void> {
    try {
      const dto: CreateCourseDto = {
        name: nameInput.value,
        professor_id: +prof_id.value,
        credits: +creditsInput.value

      }
      const created: Courses = await firstValueFrom(
        this.coursesService.create(dto)
      );

      this.courses.push(created);
      alert(`Corso (${created.name} creato.`)
    } catch (err) {
      console.error("Errore creazione corso: ", err);
      alert("Non è stato possibile creare il corso.");
    }
  }

    async loadCourses(): Promise<void>{
    try{
      this.courses = await firstValueFrom(this.coursesService.getAll());
    }catch(err){
      console.error("Errore caricamento corsi", err);
      alert("Impossibile caricare i corsi");
    }
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