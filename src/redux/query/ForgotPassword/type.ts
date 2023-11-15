export interface IForgot {
  email?: string;
}
export interface IForgotResponse {
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
