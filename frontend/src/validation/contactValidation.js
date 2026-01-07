import {object,string} from 'yup';

export const contactSchema = object().shape({
  name: string().required('Name is required'),
  email: string().email('Invalid email').required('Email is required'),
  phone: string().required('Phone is required'),
  message: string().required('Message is required'),
});
