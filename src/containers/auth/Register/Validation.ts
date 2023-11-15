import {IRegister} from '../../../redux/query/Register/type';

export interface IRegisterFormValidationErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  mobileNumber?: number | string;
  make?: string;
  model?: string;
  year?: number | string | undefined;
  color?: string;
  condition?: string;
  rideshareDriver?: string;
  describeDrivingActivity?: string;
  address?: string;
  password?: string;
  confirmPassword?: string;
}
export const validateRegisterForm = (formData: IRegister) => {
  // Regular expression pattern for email validation
  const email_pattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  const phonePattern = /^[0-9]{10}$/;

  // Object to store validation errors
  let validation_errors: IRegisterFormValidationErrors = {};

  // Validate email
  if (!formData.email || !email_pattern.test(formData.email)) {
    validation_errors.email =
      'Email is required and must be a valid email address.';
  }

  if (
    !formData.phone_number || // Check if it's falsy
    (typeof formData.phone_number === 'string' &&
      !phonePattern.test(formData.phone_number)) // Check if it's a string and matches the pattern
  ) {
    validation_errors.mobileNumber =
      'Mobile number is required and must be a valid 13-digit numeric string.';
  }

  // Validate last name
  if (!formData.last_name) {
    validation_errors.lastName = 'Last name is required.';
  }

  // Validate last name
  if (!formData.first_name) {
    validation_errors.firstName = 'First name is required.';
  }
  // Validate make (example field)
  if (!formData.make) {
    validation_errors.make = 'Make is required.';
  }

  // Validate model (example field)
  if (!formData.model) {
    validation_errors.model = 'Model is required.';
  }

  // Validate year (example field)
  if (
    !formData.year ||
    isNaN(formData.year as number) ||
    (formData.year as number) < 1900
  ) {
    validation_errors.year = 'Year is required and must be a valid year.';
  }

  // Validate color (example field)
  if (!formData.color) {
    validation_errors.color = 'Color is required.';
  }

  // Validate condition (example field)
  if (!formData.condition) {
    validation_errors.condition = 'Condition is required.';
  }

  // Validate rideshare driver (example field)
  if (!formData.ride_share) {
    validation_errors.rideshareDriver = 'Rideshare driver is required.';
  }

  // Validate describe driving activity (example field)
  if (!formData.driver_activity) {
    validation_errors.describeDrivingActivity =
      'Describe driving activity is required.';
  }

  // Validate address (example field)
  if (!formData.address) {
    validation_errors.address = 'Address is required.';
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
  // Validate confirm password (example field)
  if (formData.password !== formData.confirmPassword) {
    validation_errors.confirmPassword = 'Passwords do not match.';
  }

  return validation_errors;
};
