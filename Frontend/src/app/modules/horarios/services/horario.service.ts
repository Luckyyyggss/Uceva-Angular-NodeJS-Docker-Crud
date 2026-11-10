import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { API_URL } from '../../shared/config/api.config';
import { CreateHorarioRequest, Horario, UpdateHorarioRequest } from '../interfaces/horario';

@Injectable({
  providedIn: 'root',
})
export class HorarioService {

  private http = inject(HttpClient);
  private url = `${API_URL}/horarios`;

  getAll(): Observable<Horario[]> {
    return this.http.get<Horario[]>(this.url).pipe(
      map((horarios) => horarios.map((h) => this.normalize(h)))
    );
  }

  getById(id: number): Observable<Horario> {
    return this.http.get<Horario>(`${this.url}/${id}`).pipe(map((h) => this.normalize(h)));
  }

  create(horario: CreateHorarioRequest): Observable<Horario> {
    return this.http.post<Horario>(this.url, horario);
  }

  update(id: number, horario: UpdateHorarioRequest): Observable<Horario> {
    return this.http.put<Horario>(`${this.url}/${id}`, horario);
  }

  delete(id: number): Observable<{ result: boolean }> {
    return this.http.delete<{ result: boolean }>(`${this.url}/${id}`);
  }

  /** PostgreSQL devuelve el tipo TIME como `HH:mm:ss`; la interfaz trabaja con `HH:mm`. */
  private normalize(horario: Horario): Horario {
    return {
      ...horario,
      hora_inicio: horario.hora_inicio?.slice(0, 5),
      hora_fin: horario.hora_fin?.slice(0, 5),
    };
  }

}
