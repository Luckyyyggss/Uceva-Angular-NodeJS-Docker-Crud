import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, forkJoin, of } from 'rxjs';
import { CourseService } from '../../../courses/services/course.service';
import { Back } from '../../../shared/components/back/back';
import { AlertService } from '../../../shared/services/alert.service';
import { getErrorMessage } from '../../../shared/utils/http-error';
import { StudentService } from '../../../students/services/student.service';
import { NOTA_APROBATORIA } from '../../interfaces/calificacion';
import { CalificacionRow } from '../../interfaces/table-calificaciones';
import { CalificacionService } from '../../services/calificacion.service';

@Component({
  selector: 'app-detail-calificacion',
  imports: [Back],
  templateUrl: './detail-calificacion.html',
})
export class DetailCalificacion implements OnInit {

  calificacion: CalificacionRow | null = null;
  loaded = false;
  notaAprobatoria = NOTA_APROBATORIA;

  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private alertService = inject(AlertService);
  private studentService = inject(StudentService);
  private courseService = inject(CourseService);
  private calificacionService = inject(CalificacionService);

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.calificacionService.getById(id).subscribe({
      next: (item) => {
        if (!item) {
          this.loaded = true;
          return;
        }
        // Se consultan estudiante y curso para mostrar sus nombres.
        forkJoin({
          student: this.studentService.getById(item.student_id).pipe(catchError(() => of(null))),
          course: this.courseService.getById(item.course_id).pipe(catchError(() => of(null))),
        }).subscribe(({ student, course }) => {
          this.calificacion = {
            ...item,
            studentName: student?.name ?? `Estudiante #${item.student_id}`,
            courseName: course?.name ?? `Curso #${item.course_id}`,
          };
          this.loaded = true;
        });
      },
      error: (error) => {
        this.alertService.toast(getErrorMessage(error, 'Error al consultar la calificación'), 'error');
        this.router.navigateByUrl('/calificaciones');
      },
    });
  }

}
