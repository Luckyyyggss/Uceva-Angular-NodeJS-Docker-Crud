import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { API_URL } from '../../shared/config/api.config';
import { Calificacion, CreateCalificacionRequest, UpdateCalificacionRequest } from '../interfaces/calificacion';

@Injectable({
  providedIn: 'root',
})
export class CalificacionService {

  private http = inject(HttpClient);
  private url = `${API_URL}/calificaciones`;

  getAll(): Observable<Calificacion[]> {
    return this.http.get<Calificacion[]>(this.url).pipe(
      map((items) => items.map((item) => this.normalize(item)))
    );
  }

  /** El backend responde `null` cuando la calificación no existe. */
  getById(id: number): Observable<Calificacion | null> {
    return this.http.get<Calificacion | null>(`${this.url}/${id}`).pipe(
      map((item) => (item ? this.normalize(item) : null))
    );
  }

  create(calificacion: CreateCalificacionRequest): Observable<Calificacion> {
    return this.http.post<Calificacion>(this.url, calificacion);
  }

  update(id: number, calificacion: UpdateCalificacionRequest): Observable<Calificacion> {
    return this.http.put<Calificacion>(`${this.url}/${id}`, calificacion);
  }

  delete(id: number): Observable<{ result: boolean }> {
    return this.http.delete<{ result: boolean }>(`${this.url}/${id}`);
  }

  /** PostgreSQL devuelve las columnas NUMERIC como texto (ej. "4.50"). */
  private normalize(item: Calificacion): Calificacion {
    return { ...item, grade: Number(item.grade) };
  }

}
