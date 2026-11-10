import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Back } from '../../../shared/components/back/back';
import { AlertService } from '../../../shared/services/alert.service';
import { getErrorMessage } from '../../../shared/utils/http-error';
import { Horario } from '../../interfaces/horario';
import { HorarioService } from '../../services/horario.service';

@Component({
  selector: 'app-detail-horario',
  imports: [Back],
  templateUrl: './detail-horario.html',
})
export class DetailHorario implements OnInit {

  horario: Horario | null = null;

  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private alertService = inject(AlertService);
  private horarioService = inject(HorarioService);

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.horarioService.getById(id).subscribe({
      next: (horario) => (this.horario = horario),
      error: (error) => {
        this.alertService.toast(getErrorMessage(error, 'Error al consultar el horario'), 'error');
        this.router.navigateByUrl('/horarios');
      },
    });
  }

}
