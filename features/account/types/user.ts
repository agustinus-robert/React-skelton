export interface CreateUserPayload {
  name: string;
  username: string;
  password: string;
  email: string;
}

export interface UpdateUserPayload {
  name: string;
  username: string;
  password?: string;
  email: string;
}

export interface getUserPayload {
  name?: string;
  username?: string;
  role_id?: number;
  email?: string;
}

export interface userRolePayload {
  role_id: number | null;
  user_id: number | null;
}
