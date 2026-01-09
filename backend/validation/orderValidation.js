import { object , array,string } from 'yup';

export const orderSchema = object({
productIds:array().of(string()),
});