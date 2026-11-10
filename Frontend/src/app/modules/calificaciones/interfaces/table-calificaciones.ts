import { Calificacion } from './calificacion';

/** Calificación con los nombres del estudiante y del curso ya resueltos. */
export interface CalificacionRow extends Calificacion {
  studentName: string;
  courseName: string;
}
