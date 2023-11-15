export interface IRegister {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone_number?: number | string;
  country_code?: string;
  gender?: string;
  make?: string;
  model?: string;
  year?: number | string | undefined;
  color?: string;
  condition?: string;
  ride_share?: string;
  driver_activity?: string;
  address?: string;
  password?: string;
  confirmPassword?: string;
}
export interface IRegisterResponse {
  message: string;
  status: boolean;
  error: Error;
  data: Data;
}
export interface Error {}
export interface Data {
  token: string;
  id: number;
}
