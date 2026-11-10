import { Routes } from '@angular/router';

// Students
import { ListStudents } from './modules/students/pages/list-students/list-students';
import { CreateStudent } from './modules/students/pages/create-student/create-student';
import { DetailStudent } from './modules/students/pages/detail-student/detail-student';
import { UpdateStudent } from './modules/students/pages/update-student/update-student';

// Courses
import { ListCourses } from './modules/courses/pages/list-courses/list-courses';
import { CreateCourse } from './modules/courses/pages/create-course/create-course';
import { DetailCourse } from './modules/courses/pages/detail-course/detail-course';
import { UpdateCourse } from './modules/courses/pages/update-course/update-course';

// Calificaciones
import { ListCalificaciones } from './modules/calificaciones/pages/list-calificaciones/list-calificaciones';
import { CreateCalificacion } from './modules/calificaciones/pages/create-calificacion/create-calificacion';
import { DetailCalificacion } from './modules/calificaciones/pages/detail-calificacion/detail-calificacion';
import { UpdateCalificacion } from './modules/calificaciones/pages/update-calificacion/update-calificacion';

// Horarios
import { ListHorarios } from './modules/horarios/pages/list-horarios/list-horarios';
import { CreateHorario } from './modules/horarios/pages/create-horario/create-horario';
import { DetailHorario } from './modules/horarios/pages/detail-horario/detail-horario';
import { UpdateHorario } from './modules/horarios/pages/update-horario/update-horario';

export const routes: Routes = [
    { path: '', redirectTo: 'students', pathMatch: 'full' },
    {
        path: 'students',
        children: [
            { path: 'list', component: ListStudents },
            { path: 'create', component: CreateStudent },
            { path: 'update/:id', component: UpdateStudent },
            { path: 'detail/:id', component: DetailStudent },
            { path: '', redirectTo: 'list', pathMatch: 'full' },
            { path: '**', redirectTo: 'list' }
        ]
    },
    {
        path: 'courses',
        children: [
            { path: 'list', component: ListCourses },
            { path: 'create', component: CreateCourse },
            { path: 'update/:id', component: UpdateCourse },
            { path: 'detail/:id', component: DetailCourse },
            { path: '', redirectTo: 'list', pathMatch: 'full' },
            { path: '**', redirectTo: 'list' }
        ]
    },
    {
        path: 'calificaciones',
        children: [
            { path: 'list', component: ListCalificaciones },
            { path: 'create', component: CreateCalificacion },
            { path: 'update/:id', component: UpdateCalificacion },
            { path: 'detail/:id', component: DetailCalificacion },
            { path: '', redirectTo: 'list', pathMatch: 'full' },
            { path: '**', redirectTo: 'list' }
        ]
    },
    {
        path: 'horarios',
        children: [
            { path: 'list', component: ListHorarios },
            { path: 'create', component: CreateHorario },
            { path: 'update/:id', component: UpdateHorario },
            { path: 'detail/:id', component: DetailHorario },
            { path: '', redirectTo: 'list', pathMatch: 'full' },
            { path: '**', redirectTo: 'list' }
        ]
    },
    { path: '**', redirectTo: 'students' }
];
