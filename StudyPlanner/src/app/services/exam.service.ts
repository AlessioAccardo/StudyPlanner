import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

export interface Exam {
    code: number;
    name: string;
    credits: number;
    enrolled_students: number;
    professor_id: number;
    approved: boolean | null;
    date: string;
    course_id: number;
    selezionato: boolean | null
}

@Injectable({ providedIn: 'root' })
export class ExamService {
    private apiUrl = 'http://localhost:3000/api/exam';
    
    constructor(private http: HttpClient) {}

    getAllExams(): Observable<Exam[]> {
        return this.http.get<Exam[]>(this.apiUrl);
    }

    getExamByCode(code: number): Observable<Exam> {
        return this.http.get<Exam>(`${this.apiUrl}/${code}`);
    }

    getExamByName(name: string): Observable<Exam[]> {
        return this.http.get<Exam[]>(`${this.apiUrl}/${name}`)
    }

    getExamByProfessorId(professor_id: number): Observable<Exam[]> {
        return this.http.get<Exam[]>(`${this.apiUrl}/professor/${professor_id}`);
    }

    getExamByProfessorFullName(first_name: string, last_name: string): Observable<Exam[]> {
        const params = new HttpParams().set('first_name', first_name).set('last_name', last_name);
        return this.http.get<Exam[]>(`${this.apiUrl}/search`, { params });
    }

    getExamRequests(): Observable<Exam[]> {
       return this.http.get<Exam[]>(`${this.apiUrl}/requested`); 
    }

    createExam(exam: Exam) {
        return this.http.post<Exam>(this.apiUrl, exam);
    }

    approveExam(code: number, approved: boolean) {
        return this.http.put<Exam>(`${this.apiUrl}/approve`, { code, approved });
    }
}