import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TableActions } from '../../../shared/components/table-actions/table-actions';
import { TableEvent } from '../../../shared/interfaces/table';
import { NOTA_APROBATORIA } from '../../interfaces/calificacion';
import { CalificacionRow } from '../../interfaces/table-calificaciones';

@Component({
  selector: 'app-table-calificaciones',
  imports: [TableActions],
  templateUrl: './table-calificaciones.html',
})
export class TableCalificaciones {
  @Input() calificaciones: CalificacionRow[] = [];
  @Output() onClickActions = new EventEmitter<TableEvent>();

  notaAprobatoria = NOTA_APROBATORIA;
}
