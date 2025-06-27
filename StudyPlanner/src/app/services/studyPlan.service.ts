import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

export interface StudyPlan {
    student_id: number,
    course_id: number,
    grade: number | null
}

@Injectable({ providedIn: 'root'})
export class StudyPlanService {
    private apiUrl = 'http://localhost:3000/api/studyPlan';

    constructor(private http: HttpClient) {}

    getByStudentId(id: number): Observable<StudyPlan[]>{
        return this.http.get<StudyPlan[]>(`${this.apiUrl}/student/${id}`);
    }

    getByStudentFullName(first_name: string, last_name: string): Observable<StudyPlan[]> {
        const params = new HttpParams().set('first_name', first_name).set('last_name', last_name);
        return this.http.get<StudyPlan[]>(`${this.apiUrl}/search`, { params });
    }

    create(studyPlan: StudyPlan) {
        return this.http.post<StudyPlan>(this.apiUrl, studyPlan);
    }

}