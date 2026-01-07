import { object, string, date } from "yup";

export const userSchema = object({
  name: string()
    .required().min(3).max(20)
    .test(
      "name-validation",
      "Name must contain only letters and spaces",
      (value) => {
        return /^[a-zA-Z\s]+$/.test(value);
      }
    ),
  password: string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long') 
    .matches(/[a-z]/, 'Password requires a lowercase letter ' ) 
    .matches(/[A-Z]/, 'Password requires an uppercase letter ') 
    .matches(/[0-9]/, 'Password requires a number')
    .matches(/[^a-zA-Z0-9]/, 'Password requires a special character'),
  email: string()
    .required()
    .email()
    .test("email-validation", "Invalid email format", (value) => {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }),
  createdOn: date().default(() => new Date()),
});
