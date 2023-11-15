import {IForgot} from '../../../redux/query/ForgotPassword/type';

export interface IForgotFormValidationErrors {
  email?: string;
}
export const validateForgotForm = (formData: IForgot) => {
  // Regular expression pattern for email validation
  const email_pattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  // Object to store validation errors
  let validation_errors: IForgotFormValidationErrors = {};

  // Validate email
  if (!formData.email || !email_pattern.test(formData.email)) {
    validation_errors.email =
      'Email is required and must be a valid email address.';
  }
  return validation_errors;
};
