export interface Permission {
  id: number;
  name: string;
  can_create: boolean;
  can_read: boolean;
  can_edit: boolean;
  can_delete: boolean;
}
