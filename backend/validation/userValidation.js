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
