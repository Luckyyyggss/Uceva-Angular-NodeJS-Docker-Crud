import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Back } from '../../../shared/components/back/back';
import { AlertService } from '../../../shared/services/alert.service';
import { getErrorMessage } from '../../../shared/utils/http-error';
import { FormCourse } from '../../components/form-course/form-course';
import { CreateCourseRequest } from '../../interfaces/course';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-create-course',
  imports: [Back, FormCourse],
  templateUrl: './create-course.html',
})
export class CreateCourse {

  saving = false;

  private router = inject(Router);
  private alertService = inject(AlertService);
  private courseService = inject(CourseService);

  createCourse(course: CreateCourseRequest): void {
    this.saving = true;
    this.courseService.create(course).subscribe({
      next: () => {
        this.alertService.toast('Curso registrado correctamente', 'success');
        this.goToList();
      },
      error: (error) => {
        this.saving = false;
        this.alertService.toast(getErrorMessage(error, 'Error al crear el curso'), 'error');
      },
    });
  }

  goToList(): void {
    this.router.navigateByUrl('/courses');
  }

}
