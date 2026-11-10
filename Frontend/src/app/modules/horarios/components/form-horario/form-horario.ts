import { Component, EventEmitter, inject, Input, OnChanges, Output } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { CreateHorarioRequest, DIAS_SEMANA, Horario } from '../../interfaces/horario';

/** La hora de fin debe ser posterior a la hora de inicio. */
function rangoHorarioValido(group: AbstractControl): ValidationErrors | null {
  const inicio = group.get('hora_inicio')?.value;
  const fin = group.get('hora_fin')?.value;
  return inicio && fin && fin <= inicio ? { rangoInvalido: true } : null;
}

/** Formulario reutilizado por las páginas de creación y actualización. */
@Component({
  selector: 'app-form-horario',
  imports: [ReactiveFormsModule],
  templateUrl: './form-horario.html',
})
export class FormHorario implements OnChanges {

  @Input() horario: Horario | null = null;
  @Input() submitLabel = 'Guardar horario';
  @Input() saving = false;
  @Output() formSubmit = new EventEmitter<CreateHorarioRequest>();
  @Output() formCancel = new EventEmitter<void>();

  private fb = inject(FormBuilder);

  dias = DIAS_SEMANA;

  form = this.fb.nonNullable.group({
    dia: ['', Validators.required],
    hora_inicio: ['', Validators.required],
    hora_fin: ['', Validators.required],
    asignatura: ['', [Validators.required, Validators.maxLength(100)]],
  }, { validators: rangoHorarioValido });

  ngOnChanges(): void {
    if (this.horario) {
      const { dia, hora_inicio, hora_fin, asignatura } = this.horario;
      this.form.patchValue({ dia, hora_inicio, hora_fin, asignatura });
    }
  }

  isInvalid(control: string): boolean {
    const c = this.form.get(control);
    return !!c && c.touched && c.invalid;
  }

  get rangoInvalido(): boolean {
    return this.form.hasError('rangoInvalido') && !!this.form.get('hora_fin')?.touched;
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.formSubmit.emit(this.form.getRawValue());
  }
}
