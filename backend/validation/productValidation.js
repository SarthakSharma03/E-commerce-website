import { object, string, number,boolean } from 'yup';

export const productSchema = object({
 name:string().required("product cannot be created without a name ").min(3).max(20),
  description:string().required().min(10).max(80),
  category:string().required().oneOf(["computer","phone","smartWatch","Camera","Headphone","Gaming"]),
  stock:number().required().min(1).integer() ,
  oldPrice: number().required().min(1).integer(),
  discount: number().required().min(1).integer(),
  isNewArrival:boolean() 
});




