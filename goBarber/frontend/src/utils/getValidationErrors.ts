import { ValidationError } from 'yup';

interface FormErrors {
  [key: string]: string;
}

export default function getValidationErrors(err: ValidationError): FormErrors {
  const formErrors: FormErrors = {};
  err.inner.forEach((validationError) => {
    formErrors[validationError.path] = validationError.message;
  });
  return formErrors;
}
