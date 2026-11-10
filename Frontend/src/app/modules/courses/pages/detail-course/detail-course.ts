import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Back } from '../../../shared/components/back/back';
import { AlertService } from '../../../shared/services/alert.service';
import { getErrorMessage } from '../../../shared/utils/http-error';
import { Course } from '../../interfaces/course';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-detail-course',
  imports: [Back],
  templateUrl: './detail-course.html',
})
export class DetailCourse implements OnInit {

  course: Course | null = null;
  loaded = false;

  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private alertService = inject(AlertService);
  private courseService = inject(CourseService);

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.courseService.getById(id).subscribe({
      next: (course) => {
        this.course = course;
        this.loaded = true;
      },
      error: (error) => {
        this.alertService.toast(getErrorMessage(error, 'Error al consultar el curso'), 'error');
        this.router.navigateByUrl('/courses');
      },
    });
  }

}
