import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Back } from '../../../shared/components/back/back';
import { AlertService } from '../../../shared/services/alert.service';
import { getErrorMessage } from '../../../shared/utils/http-error';
import { FormHorario } from '../../components/form-horario/form-horario';
import { CreateHorarioRequest } from '../../interfaces/horario';
import { HorarioService } from '../../services/horario.service';

@Component({
  selector: 'app-create-horario',
  imports: [Back, FormHorario],
  templateUrl: './create-horario.html',
})
export class CreateHorario {

  saving = false;

  private router = inject(Router);
  private alertService = inject(AlertService);
  private horarioService = inject(HorarioService);

  createHorario(horario: CreateHorarioRequest): void {
    this.saving = true;
    this.horarioService.create(horario).subscribe({
      next: () => {
        this.alertService.toast('Horario registrado correctamente', 'success');
        this.goToList();
      },
      error: (error) => {
        this.saving = false;
        this.alertService.toast(getErrorMessage(error, 'Error al crear el horario'), 'error');
      },
    });
  }

  goToList(): void {
    this.router.navigateByUrl('/horarios');
  }

}
