import { object, array, string, number } from 'yup';

export const orderSchema = object({
  orderItems: array()
    .of(
      object({
        name: string().required(),
        qty: number().required().min(1),
        image: string().required(),
        price: number().required().min(0),
        product: string().required(),
      })
    )
    .required()
    .min(1),
  shippingAddress: object({
    address: string().required(),
    city: string().required(),
    postalCode: string().required(),
    country: string().required(),
  }).required(),
  paymentMethod: string().required(),
  itemsPrice: number().required().min(0),
  taxPrice: number().required().min(0),
  shippingPrice: number().required().min(0),
  totalPrice: number().required().min(0),
});
