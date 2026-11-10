import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, forkJoin, of } from 'rxjs';
import { CourseService } from '../../../courses/services/course.service';
import { Button } from '../../../shared/components/button/button';
import { ButtonConfig } from '../../../shared/interfaces/button';
import { TableEvent } from '../../../shared/interfaces/table';
import { AlertService } from '../../../shared/services/alert.service';
import { getErrorMessage } from '../../../shared/utils/http-error';
import { StudentService } from '../../../students/services/student.service';
import { TableCalificaciones } from '../../components/table-calificaciones/table-calificaciones';
import { CalificacionRow } from '../../interfaces/table-calificaciones';
import { CalificacionService } from '../../services/calificacion.service';

@Component({
  selector: 'app-list-calificaciones',
  imports: [Button, TableCalificaciones],
  templateUrl: './list-calificaciones.html',
})
export class ListCalificaciones implements OnInit {

  calificaciones: CalificacionRow[] = [];

  createButtonConfig: ButtonConfig = {
    id: 'create-calificacion-button',
    title: 'Crear calificación',
    type: 'primary',
    icon: 'plus-lg',
  };

  private router = inject(Router);
  private alertService = inject(AlertService);
  private studentService = inject(StudentService);
  private courseService = inject(CourseService);
  private calificacionService = inject(CalificacionService);

  ngOnInit(): void {
    this.getCalificaciones();
  }

  getCalificaciones(): void {
    // Estudiantes y cursos solo se usan para mostrar nombres; si fallan se muestra el id.
    forkJoin({
      calificaciones: this.calificacionService.getAll(),
      students: this.studentService.getAll().pipe(catchError(() => of([]))),
      courses: this.courseService.getAll().pipe(catchError(() => of([]))),
    }).subscribe({
      next: ({ calificaciones, students, courses }) => {
        this.calificaciones = calificaciones.map((item) => ({
          ...item,
          studentName: students.find((s) => s.id === item.student_id)?.name ?? `Estudiante #${item.student_id}`,
          courseName: courses.find((c) => c.id === item.course_id)?.name ?? `Curso #${item.course_id}`,
        }));
      },
      error: (error) => this.alertService.toast(
        getErrorMessage(error, 'Error al consultar las calificaciones'), 'error'
      ),
    });
  }

  createCalificacion(): void {
    this.router.navigateByUrl('/calificaciones/create');
  }

  tableEvents({ id, action }: TableEvent): void {
    switch (action) {
      case 'detail':
        this.router.navigateByUrl(`/calificaciones/detail/${id}`);
        break;
      case 'edit':
        this.router.navigateByUrl(`/calificaciones/update/${id}`);
        break;
      case 'delete':
        this.delete(id);
        break;
    }
  }

  async delete(id: number): Promise<void> {
    const confirmed = await this.alertService.confirm(
      '¿Está seguro?', `Se va a eliminar la calificación ${id}`
    );
    if (!confirmed) return;

    this.calificacionService.delete(id).subscribe({
      next: () => {
        this.alertService.toast('Calificación eliminada correctamente', 'success');
        this.getCalificaciones();
      },
      error: (error) => this.alertService.toast(
        getErrorMessage(error, 'Error al eliminar la calificación'), 'error'
      ),
    });
  }

}
