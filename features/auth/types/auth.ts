export interface LoginUserDto {
  id: number;
  username: string;
  email: string;
  name: string | null;
}

export interface LoginSuccess {
  success: true;
  message: string;
  data: LoginUserDto;
  token: string;
}

export interface LoginFailed {
  success: false;
  message: string;
  data: null;
}

export type LoginResult = LoginSuccess | LoginFailed;
