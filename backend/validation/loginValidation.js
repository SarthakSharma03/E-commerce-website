import { object, string, date } from "yup";

export const loginSchema = object({
  password: string()
    .required()
    .test(
      "password-validation",
      "Password must be at least 8 characters and contain letters and numbers and special characters",
      (value) => {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
          value
        );
      }
    ),
  email: string()
    .required()
    .email()
    .test("email-validation", "Invalid email format", (value) => {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }),
  createdOn: date().default(() => new Date()),
});
