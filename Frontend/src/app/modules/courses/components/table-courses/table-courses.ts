import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TableActions } from '../../../shared/components/table-actions/table-actions';
import { TableEvent } from '../../../shared/interfaces/table';
import { Course } from '../../interfaces/course';

@Component({
  selector: 'app-table-courses',
  imports: [TableActions],
  templateUrl: './table-courses.html',
})
export class TableCourses {
  @Input() courses: Course[] = [];
  @Output() onClickActions = new EventEmitter<TableEvent>();
}
