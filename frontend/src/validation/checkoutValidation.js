import {object,string} from 'yup';

export const checkoutSchema = object().shape({
  address: string().required('Address is required'),
  city: string().required('City is required'),
  postalCode: string().required('Postal Code is required'),
  country: string().required('Country is required'),
  paymentMethod: string().required('Payment method is required'),
  cardNumber: string().when('paymentMethod', {
    is: 'Credit Card',
    then: (schema) => schema.required('Card number is required').matches(/^\d{16}$/, 'Card number must be 16 digits'),
    otherwise: (schema) => schema.notRequired(),
  }),
  expiry: string().when('paymentMethod', {
    is: 'Credit Card',
    then: (schema) => schema.required('Expiry is required').matches(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Expiry must be in MM/YY format'),
    otherwise: (schema) => schema.notRequired(),
  }),
  cvv: string().when('paymentMethod', {
    is: 'Credit Card',
    then: (schema) => schema.required('CVV is required').matches(/^\d{3,4}$/, 'CVV must be 3 or 4 digits'),
    otherwise: (schema) => schema.notRequired(),
  }),
  name: string().when('paymentMethod', {
    is: 'Credit Card',
    then: (schema) => schema.required('Cardholder name is required'),
    otherwise: (schema) => schema.notRequired(),
  }),
});
