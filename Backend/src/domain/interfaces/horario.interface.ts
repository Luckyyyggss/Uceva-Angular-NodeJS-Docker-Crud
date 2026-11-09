export interface Horario {
  id: number;
  dia: string;
  hora_inicio: string;
  hora_fin: string;
  asignatura: string;
}

export type CreateHorario = Omit<Horario, "id">;
export type UpdateHorario = Omit<Horario, "id">;