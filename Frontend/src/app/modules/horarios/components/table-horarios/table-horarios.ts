import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TableActions } from '../../../shared/components/table-actions/table-actions';
import { TableEvent } from '../../../shared/interfaces/table';
import { Horario } from '../../interfaces/horario';

@Component({
  selector: 'app-table-horarios',
  imports: [TableActions],
  templateUrl: './table-horarios.html',
})
export class TableHorarios {
  @Input() horarios: Horario[] = [];
  @Output() onClickActions = new EventEmitter<TableEvent>();
}
