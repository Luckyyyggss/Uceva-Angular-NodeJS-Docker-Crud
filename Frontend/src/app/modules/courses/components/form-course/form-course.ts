import { Component, EventEmitter, inject, Input, OnChanges, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Course, CreateCourseRequest } from '../../interfaces/course';

/** Formulario reutilizado por las páginas de creación y actualización. */
@Component({
  selector: 'app-form-course',
  imports: [ReactiveFormsModule],
  templateUrl: './form-course.html',
})
export class FormCourse implements OnChanges {

  @Input() course: Course | null = null;
  @Input() submitLabel = 'Guardar curso';
  @Input() saving = false;
  @Output() formSubmit = new EventEmitter<CreateCourseRequest>();
  @Output() formCancel = new EventEmitter<void>();

  private fb = inject(FormBuilder);

  semesters = Array.from({ length: 10 }, (_, i) => i + 1);
  credits = Array.from({ length: 10 }, (_, i) => i + 1);

  form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.maxLength(100)]],
    description: ['', Validators.required],
    credits: [1, [Validators.required, Validators.min(1), Validators.max(10)]],
    semester: [1, [Validators.required, Validators.min(1), Validators.max(10)]],
    status: [true],
  });

  ngOnChanges(): void {
    if (this.course) {
      const { name, description, credits, semester, status } = this.course;
      this.form.patchValue({ name, description, credits, semester, status });
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
    this.formSubmit.emit(this.form.getRawValue());
  }
}
