import { Component, OnInit, inject} from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { ReactiveFormsModule, FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
import { ExamService, Exam } from '../services/exam.service';

@Component({
  selector: 'app-request',
  imports: [ReactiveFormsModule],
  templateUrl: './request.component.html',
  styleUrl: './request.component.scss',
  standalone: true,
})
export class RequestComponent implements OnInit {
  auth = inject(AuthService);
  fb = inject(FormBuilder);
  router = inject(Router);
  

  exam: Exam = {
    name: '',
    credits: 0,
    enrolled_students: 0,
    professor_id: 0,
    date: '',
    course_id: 0
  };

  requests: Exam[] = [];


  constructor(private examService: ExamService) {}

  ngOnInit(): void {
    //if (!this.auth.role || this.auth.role() !== 'admin') {
    //  this.router.navigate(['/no-role']);
    //  return;
    //}
    
    if (this.auth.role() === 'admin') {
      this.loadRequests();
    }
  }

  onSubmit(name: HTMLInputElement, date: HTMLInputElement) {
    this.exam.name = name.value;
    this.exam.date = date.value;
    name.value = "";
    date.value = "";
  }

  loadRequests() {
    this.examService.getExamRequests().subscribe((data) => {
      this.requests = data;
    })
      
  }


}
