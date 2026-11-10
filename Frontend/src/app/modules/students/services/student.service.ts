import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '../../shared/config/api.config';
import { CreateStudentRequest, Student, UpdateStudentRequest } from '../interfaces/student';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  
  http = inject(HttpClient);
  url = `${API_URL}/students`;

  getAll(): Observable<Student[]> {
    return this.http.get<Student[]>(this.url);
  }

  getById(id: number): Observable<Student> {
    return this.http.get<Student>(`${this.url}/${id}`);
  }

  create(student: CreateStudentRequest): Observable<Student> {
    return this.http.post<Student>(this.url, student);
  }

  update(id: number, student: UpdateStudentRequest): Observable<Student> {
    return this.http.put<Student>(`${this.url}/${id}`, student);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

}
