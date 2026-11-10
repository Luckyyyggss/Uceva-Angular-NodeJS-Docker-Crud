import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Back } from '../../../shared/components/back/back';
import { AlertService } from '../../../shared/services/alert.service';
import { getErrorMessage } from '../../../shared/utils/http-error';
import { FormHorario } from '../../components/form-horario/form-horario';
import { Horario, UpdateHorarioRequest } from '../../interfaces/horario';
import { HorarioService } from '../../services/horario.service';

@Component({
  selector: 'app-update-horario',
  imports: [Back, FormHorario],
  templateUrl: './update-horario.html',
})
export class UpdateHorario implements OnInit {

  id!: number;
  horario: Horario | null = null;
  saving = false;

  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private alertService = inject(AlertService);
  private horarioService = inject(HorarioService);

  ngOnInit(): void {
    const paramId = this.route.snapshot.paramMap.get('id');
    this.id = Number(paramId);
    if (!paramId || !Number.isInteger(this.id) || this.id <= 0) {
      this.alertService.toast('Identificación no válida', 'error');
      this.goToList();
      return;
    }
    this.getHorario();
  }

  getHorario(): void {
    this.horarioService.getById(this.id).subscribe({
      next: (horario) => (this.horario = horario),
      error: (error) => {
        this.alertService.toast(getErrorMessage(error, 'Error al consultar el horario'), 'error');
        this.goToList();
      },
    });
  }

  updateHorario(horario: UpdateHorarioRequest): void {
    this.saving = true;
    this.horarioService.update(this.id, horario).subscribe({
      next: () => {
        this.alertService.toast('Horario actualizado correctamente', 'success');
        this.goToList();
      },
      error: (error) => {
        this.saving = false;
        this.alertService.toast(getErrorMessage(error, 'Error al actualizar el horario'), 'error');
      },
    });
  }

  goToList(): void {
    this.router.navigateByUrl('/horarios');
  }

}
