import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Button } from '../../../shared/components/button/button';
import { ButtonConfig } from '../../../shared/interfaces/button';
import { TableEvent } from '../../../shared/interfaces/table';
import { AlertService } from '../../../shared/services/alert.service';
import { getErrorMessage } from '../../../shared/utils/http-error';
import { TableCourses } from '../../components/table-courses/table-courses';
import { Course } from '../../interfaces/course';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-list-courses',
  imports: [Button, TableCourses],
  templateUrl: './list-courses.html',
})
export class ListCourses implements OnInit {

  courses: Course[] = [];

  createButtonConfig: ButtonConfig = {
    id: 'create-course-button',
    title: 'Crear curso',
    type: 'primary',
    icon: 'plus-lg',
  };

  private router = inject(Router);
  private courseService = inject(CourseService);
  private alertService = inject(AlertService);

  ngOnInit(): void {
    this.getCourses();
  }

  getCourses(): void {
    this.courseService.getAll().subscribe({
      next: (courses) => (this.courses = courses),
      error: (error) => this.alertService.toast(
        getErrorMessage(error, 'Error al consultar los cursos'), 'error'
      ),
    });
  }

  createCourse(): void {
    this.router.navigateByUrl('/courses/create');
  }

  tableEvents({ id, action }: TableEvent): void {
    switch (action) {
      case 'detail':
        this.router.navigateByUrl(`/courses/detail/${id}`);
        break;
      case 'edit':
        this.router.navigateByUrl(`/courses/update/${id}`);
        break;
      case 'delete':
        this.delete(id);
        break;
    }
  }

  async delete(id: number): Promise<void> {
    const confirmed = await this.alertService.confirm(
      '¿Está seguro?', `Se va a eliminar el curso ${id}`
    );
    if (!confirmed) return;

    this.courseService.delete(id).subscribe({
      next: () => {
        this.alertService.toast('Curso eliminado correctamente', 'success');
        this.getCourses();
      },
      error: (error) => this.alertService.toast(
        getErrorMessage(error, 'Error al eliminar el curso'), 'error'
      ),
    });
  }

}
