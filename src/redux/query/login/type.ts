export interface ILogin {
  email?: string;
  mobileNumber?: string;
  password?: string;
}
export interface ILoginResponse {
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
