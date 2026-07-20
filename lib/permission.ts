export type PermissionAction =
  | "can_create"
  | "can_read"
  | "can_edit"
  | "can_delete";

export function can(
  user: any,
  action: PermissionAction,
  permissionName: string,
): boolean {
  if (!user?.userPermission) {
    return false;
  }

  for (const rolePermission of user.userPermission) {
    if (
      rolePermission.permission.name.toLowerCase() !==
      permissionName.toLowerCase()
    ) {
      continue;
    }

    return rolePermission[action] ?? false;
  }

  return false;
}
