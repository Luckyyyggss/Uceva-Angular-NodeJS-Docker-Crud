import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Back } from '../../../shared/components/back/back';
import { AlertService } from '../../../shared/services/alert.service';
import { getErrorMessage } from '../../../shared/utils/http-error';
import { FormCourse } from '../../components/form-course/form-course';
import { Course, UpdateCourseRequest } from '../../interfaces/course';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-update-course',
  imports: [Back, FormCourse],
  templateUrl: './update-course.html',
})
export class UpdateCourse implements OnInit {

  id!: number;
  course: Course | null = null;
  saving = false;

  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private alertService = inject(AlertService);
  private courseService = inject(CourseService);

  ngOnInit(): void {
    const paramId = this.route.snapshot.paramMap.get('id');
    this.id = Number(paramId);
    if (!paramId || !Number.isInteger(this.id) || this.id <= 0) {
      this.alertService.toast('Identificación no válida', 'error');
      this.goToList();
      return;
    }
    this.getCourse();
  }

  getCourse(): void {
    this.courseService.getById(this.id).subscribe({
      next: (course) => {
        if (!course) {
          this.alertService.toast('El curso no existe', 'error');
          this.goToList();
          return;
        }
        this.course = course;
      },
      error: (error) => {
        this.alertService.toast(getErrorMessage(error, 'Error al consultar el curso'), 'error');
        this.goToList();
      },
    });
  }

  updateCourse(course: UpdateCourseRequest): void {
    this.saving = true;
    this.courseService.update(this.id, course).subscribe({
      next: () => {
        this.alertService.toast('Curso actualizado correctamente', 'success');
        this.goToList();
      },
      error: (error) => {
        this.saving = false;
        this.alertService.toast(getErrorMessage(error, 'Error al actualizar el curso'), 'error');
      },
    });
  }

  goToList(): void {
    this.router.navigateByUrl('/courses');
  }

}
