import { Component, EventEmitter, inject, Input, OnChanges, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Course } from '../../../courses/interfaces/course';
import { Student } from '../../../students/interfaces/student';
import { Calificacion, CreateCalificacionRequest } from '../../interfaces/calificacion';

/** Formulario reutilizado por las páginas de creación y actualización. */
@Component({
  selector: 'app-form-calificacion',
  imports: [ReactiveFormsModule],
  templateUrl: './form-calificacion.html',
})
export class FormCalificacion implements OnChanges {

  @Input() calificacion: Calificacion | null = null;
  @Input() students: Student[] = [];
  @Input() courses: Course[] = [];
  /** En modo edición el identificador no puede modificarse. */
  @Input() isEdit = false;
  @Input() submitLabel = 'Guardar calificación';
  @Input() saving = false;
  @Output() formSubmit = new EventEmitter<CreateCalificacionRequest>();
  @Output() formCancel = new EventEmitter<void>();

  private fb = inject(FormBuilder);

  form = this.fb.group({
    id: [null as number | null, [Validators.required, Validators.min(1)]],
    student_id: [null as number | null, Validators.required],
    course_id: [null as number | null, Validators.required],
    grade: [null as number | null, [Validators.required, Validators.min(0), Validators.max(5)]],
    comments: ['', Validators.maxLength(255)],
    status: [true],
  });

  ngOnChanges(): void {
    if (this.calificacion) {
      const { id, student_id, course_id, grade, comments, status } = this.calificacion;
      this.form.patchValue({ id, student_id, course_id, grade, comments: comments ?? '', status });
    }
    if (this.isEdit) {
      this.form.controls.id.disable();
    }
  }

  isInvalid(control: string): boolean {
    const c = this.form.get(control);
    return !!c && c.touched && c.invalid;
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const value = this.form.getRawValue();
    this.formSubmit.emit({
      id: Number(value.id),
      student_id: Number(value.student_id),
      course_id: Number(value.course_id),
      grade: Number(value.grade),
      comments: value.comments ?? '',
      status: !!value.status,
    });
  }
}
