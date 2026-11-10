import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Button } from '../../../shared/components/button/button';
import { ButtonConfig } from '../../../shared/interfaces/button';
import { TableEvent } from '../../../shared/interfaces/table';
import { AlertService } from '../../../shared/services/alert.service';
import { getErrorMessage } from '../../../shared/utils/http-error';
import { TableHorarios } from '../../components/table-horarios/table-horarios';
import { DIAS_SEMANA, Horario } from '../../interfaces/horario';
import { HorarioService } from '../../services/horario.service';

@Component({
  selector: 'app-list-horarios',
  imports: [Button, TableHorarios],
  templateUrl: './list-horarios.html',
})
export class ListHorarios implements OnInit {

  horarios: Horario[] = [];

  createButtonConfig: ButtonConfig = {
    id: 'create-horario-button',
    title: 'Crear horario',
    type: 'primary',
    icon: 'plus-lg',
  };

  private router = inject(Router);
  private horarioService = inject(HorarioService);
  private alertService = inject(AlertService);

  ngOnInit(): void {
    this.getHorarios();
  }

  getHorarios(): void {
    this.horarioService.getAll().subscribe({
      next: (horarios) => (this.horarios = this.sortByWeek(horarios)),
      error: (error) => this.alertService.toast(
        getErrorMessage(error, 'Error al consultar los horarios'), 'error'
      ),
    });
  }

  createHorario(): void {
    this.router.navigateByUrl('/horarios/create');
  }

  tableEvents({ id, action }: TableEvent): void {
    switch (action) {
      case 'detail':
        this.router.navigateByUrl(`/horarios/detail/${id}`);
        break;
      case 'edit':
        this.router.navigateByUrl(`/horarios/update/${id}`);
        break;
      case 'delete':
        this.delete(id);
        break;
    }
  }

  async delete(id: number): Promise<void> {
    const confirmed = await this.alertService.confirm(
      '¿Está seguro?', `Se va a eliminar el horario ${id}`
    );
    if (!confirmed) return;

    this.horarioService.delete(id).subscribe({
      next: () => {
        this.alertService.toast('Horario eliminado correctamente', 'success');
        this.getHorarios();
      },
      error: (error) => this.alertService.toast(
        getErrorMessage(error, 'Error al eliminar el horario'), 'error'
      ),
    });
  }

  /** Ordena por día de la semana y hora de inicio. */
  private sortByWeek(horarios: Horario[]): Horario[] {
    return [...horarios].sort((a, b) =>
      DIAS_SEMANA.indexOf(a.dia) - DIAS_SEMANA.indexOf(b.dia)
      || a.hora_inicio.localeCompare(b.hora_inicio)
    );
  }

}
