export interface Calificacion {
  id: number;
  student_id: number;
  course_id: number;
  grade: number;
  comments?: string | null;
  status: boolean;
}

/** En este módulo el identificador lo define el usuario (igual que lo exige el backend). */
export type CreateCalificacionRequest = Calificacion;

export type UpdateCalificacionRequest = Omit<Calificacion, 'id'>;

/** Nota mínima para aprobar. */
export const NOTA_APROBATORIA = 3;
