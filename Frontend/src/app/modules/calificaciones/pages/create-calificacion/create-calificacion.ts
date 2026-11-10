import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Course } from '../../../courses/interfaces/course';
import { CourseService } from '../../../courses/services/course.service';
import { Back } from '../../../shared/components/back/back';
import { AlertService } from '../../../shared/services/alert.service';
import { getErrorMessage } from '../../../shared/utils/http-error';
import { Student } from '../../../students/interfaces/student';
import { StudentService } from '../../../students/services/student.service';
import { FormCalificacion } from '../../components/form-calificacion/form-calificacion';
import { CreateCalificacionRequest } from '../../interfaces/calificacion';
import { CalificacionService } from '../../services/calificacion.service';

@Component({
  selector: 'app-create-calificacion',
  imports: [Back, FormCalificacion],
  templateUrl: './create-calificacion.html',
})
export class CreateCalificacion implements OnInit {

  students: Student[] = [];
  courses: Course[] = [];
  saving = false;

  private router = inject(Router);
  private alertService = inject(AlertService);
  private studentService = inject(StudentService);
  private courseService = inject(CourseService);
  private calificacionService = inject(CalificacionService);

  ngOnInit(): void {
    forkJoin({
      students: this.studentService.getAll(),
      courses: this.courseService.getAll(),
    }).subscribe({
      next: ({ students, courses }) => {
        this.students = students;
        this.courses = courses;
      },
      error: (error) => this.alertService.toast(
        getErrorMessage(error, 'Error al consultar estudiantes y cursos'), 'error'
      ),
    });
  }

  createCalificacion(calificacion: CreateCalificacionRequest): void {
    this.saving = true;
    this.calificacionService.create(calificacion).subscribe({
      next: () => {
        this.alertService.toast('Calificación registrada correctamente', 'success');
        this.goToList();
      },
      error: (error) => {
        this.saving = false;
        this.alertService.toast(getErrorMessage(error, 'Error al crear la calificación'), 'error');
      },
    });
  }

  goToList(): void {
    this.router.navigateByUrl('/calificaciones');
  }

}
