import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

export interface StudyPlan {
    student_id: number,
    course_id: number,
    grade: number
}

@Injectable({ providedIn: 'root'})
export class StudyPlan {
    private apiUrl = 'http://localhost:3000/api/studyPlan'
}