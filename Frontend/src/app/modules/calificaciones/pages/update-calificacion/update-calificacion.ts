import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Course } from '../../../courses/interfaces/course';
import { CourseService } from '../../../courses/services/course.service';
import { Back } from '../../../shared/components/back/back';
import { AlertService } from '../../../shared/services/alert.service';
import { getErrorMessage } from '../../../shared/utils/http-error';
import { Student } from '../../../students/interfaces/student';
import { StudentService } from '../../../students/services/student.service';
import { FormCalificacion } from '../../components/form-calificacion/form-calificacion';
import { Calificacion, CreateCalificacionRequest } from '../../interfaces/calificacion';
import { CalificacionService } from '../../services/calificacion.service';

@Component({
  selector: 'app-update-calificacion',
  imports: [Back, FormCalificacion],
  templateUrl: './update-calificacion.html',
})
export class UpdateCalificacion implements OnInit {

  id!: number;
  calificacion: Calificacion | null = null;
  students: Student[] = [];
  courses: Course[] = [];
  saving = false;

  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private alertService = inject(AlertService);
  private studentService = inject(StudentService);
  private courseService = inject(CourseService);
  private calificacionService = inject(CalificacionService);

  ngOnInit(): void {
    const paramId = this.route.snapshot.paramMap.get('id');
    this.id = Number(paramId);
    if (!paramId || !Number.isInteger(this.id) || this.id <= 0) {
      this.alertService.toast('Identificación no válida', 'error');
      this.goToList();
      return;
    }
    this.load();
  }

  load(): void {
    forkJoin({
      calificacion: this.calificacionService.getById(this.id),
      students: this.studentService.getAll(),
      courses: this.courseService.getAll(),
    }).subscribe({
      next: ({ calificacion, students, courses }) => {
        if (!calificacion) {
          this.alertService.toast('La calificación no existe', 'error');
          this.goToList();
          return;
        }
        this.students = students;
        this.courses = courses;
        this.calificacion = calificacion;
      },
      error: (error) => {
        this.alertService.toast(getErrorMessage(error, 'Error al consultar la calificación'), 'error');
        this.goToList();
      },
    });
  }

  updateCalificacion(formValue: CreateCalificacionRequest): void {
    const { id, ...changes } = formValue;
    this.saving = true;
    this.calificacionService.update(this.id, changes).subscribe({
      next: () => {
        this.alertService.toast('Calificación actualizada correctamente', 'success');
        this.goToList();
      },
      error: (error) => {
        this.saving = false;
        this.alertService.toast(getErrorMessage(error, 'Error al actualizar la calificación'), 'error');
      },
    });
  }

  goToList(): void {
    this.router.navigateByUrl('/calificaciones');
  }

}
