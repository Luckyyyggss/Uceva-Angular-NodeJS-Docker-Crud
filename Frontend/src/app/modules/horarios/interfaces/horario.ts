export interface Horario {
  id: number;
  dia: string;
  hora_inicio: string;
  hora_fin: string;
  asignatura: string;
}

export type CreateHorarioRequest = Omit<Horario, 'id'>;

export type UpdateHorarioRequest = Omit<Horario, 'id'>;

export const DIAS_SEMANA = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
