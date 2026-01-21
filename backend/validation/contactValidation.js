import { object, string, date } from "yup";

export const contactSchema = object({
  name: string()
    .required()
    .min(3)
    .max(20)
    .test(
      "name-validation",
      "Name must contain only letters and spaces",
      (value) => {
        return /^[a-zA-Z\s]+$/.test(value);
      },
    ),
  phone: string().matches(
    /^[0-9]{1,10}$/,
    "Phone must contain only digits and be at most 10 characters",
  ),
  email: string()
    .required()
    .email()
    .test("email-validation", "Invalid email format", (value) => {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }),
  message: string()
    .required("Message is required")
    .min(10, "Message must be at least 10 characters long")
    .max(500, "Message must not exceed 500 characters"),
  createdOn: date().default(() => new Date()),
});
