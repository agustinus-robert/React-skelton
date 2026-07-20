export interface meDto {
  id: Number;
  username: String;
  email: String;
  name: String;
}

export interface meSuccess {
  success: true;
  message: string;
  data: meDto;
}

export interface meFailure {
  success: false;
  message: string;
  data: null;
}

export type meResult = meSuccess | meFailure;
