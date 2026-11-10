import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '../../shared/config/api.config';
import { Course, CreateCourseRequest, UpdateCourseRequest } from '../interfaces/course';

@Injectable({
  providedIn: 'root',
})
export class CourseService {

  private http = inject(HttpClient);
  private url = `${API_URL}/courses`;

  getAll(): Observable<Course[]> {
    return this.http.get<Course[]>(this.url);
  }

  /** El backend responde `null` cuando el curso no existe. */
  getById(id: number): Observable<Course | null> {
    return this.http.get<Course | null>(`${this.url}/${id}`);
  }

  create(course: CreateCourseRequest): Observable<Course> {
    return this.http.post<Course>(this.url, course);
  }

  update(id: number, course: UpdateCourseRequest): Observable<Course> {
    return this.http.put<Course>(`${this.url}/${id}`, course);
  }

  delete(id: number): Observable<{ result: boolean }> {
    return this.http.delete<{ result: boolean }>(`${this.url}/${id}`);
  }

}
