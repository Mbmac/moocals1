import {ILogin} from '../../../redux/query/login/type';

export interface ILoginFormValidationErrors {
  email?: string;
  password?: string;
}
export const validateLoginForm = (formData: ILogin) => {
  // Regular expression pattern for email validation
  const email_pattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

  // Object to store validation errors
  let validation_errors: ILoginFormValidationErrors = {};

  // Validate email
  if (!formData.email || !email_pattern.test(formData.email)) {
    validation_errors.email =
      'Email is required and must be a valid email address.';
  }

  // Validate password
  if (
    !formData.password ||
    typeof formData.password !== 'string' ||
    formData.password.length < 8
  ) {
    validation_errors.password =
      'Password is required and must be a string with a minimum length of 8 characters.';
  }

  return validation_errors;
};
