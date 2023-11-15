export interface IChangePassword {
  old_password?: string;
  password?: string;
  password_confirmation?: string;
}
export interface IChangePasswordResponse {
  message: string;
  status: boolean;
  error: ErrorOrData;
  data: {};
}
export interface ErrorOrData {}
