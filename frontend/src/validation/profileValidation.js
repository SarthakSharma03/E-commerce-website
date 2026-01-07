import { object, string } from 'yup';
export const profileSchema = object({
    name: string()
        .required('Name is required')
        .min(3, 'Name must be at least 3 characters')
        .max(20, 'Name must be at most 20 characters')
        .matches(/^[a-zA-Z\s]+$/, 'Name must contain only letters and spaces'),
    email: string()
        .required('Email is required')
        .email('Invalid email address'),
    address: string()
        .required('Address is required')
        .min(5, 'Address must be at least 5 characters'),
    phone: string()
        .matches(/^[0-9]{1,10}$/, 'Phone must contain only digits and be at most 10 characters'),
});
 