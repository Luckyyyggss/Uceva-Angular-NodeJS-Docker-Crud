export type TableAction = 'detail' | 'edit' | 'delete';

export interface TableEvent {
  id: number;
  action: TableAction;
}
