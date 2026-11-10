import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonConfig } from '../../interfaces/button';
import { TableAction, TableEvent } from '../../interfaces/table';
import { Button } from '../button/button';

@Component({
  selector: 'app-table-actions',
  imports: [Button],
  template: `
    <div class="d-flex justify-content-center gap-2">
      <app-button [config]="detailButton" (onClick)="emit('detail')" />
      <app-button [config]="editButton" (onClick)="emit('edit')" />
      <app-button [config]="deleteButton" (onClick)="emit('delete')" />
    </div>
  `,
})
export class TableActions {
  @Input({ required: true }) id!: number;
  @Output() onAction = new EventEmitter<TableEvent>();

  detailButton: ButtonConfig = { id: 'detail', type: 'primary', icon: 'eye', outline: true, size: 'sm' };
  editButton: ButtonConfig = { id: 'update', type: 'warning', icon: 'pencil-square', outline: true, size: 'sm' };
  deleteButton: ButtonConfig = { id: 'delete', type: 'danger', icon: 'trash', outline: true, size: 'sm' };

  emit(action: TableAction) {
    this.onAction.emit({ id: this.id, action });
  }
}
