import { object, string, number,boolean } from 'yup';

export const productSchema = object({
 name:string().required("product cannot be created without a name ").min(3).max(200),
  description:string().required().min(10).max(5000),
  category:string().required().oneOf([
    "computer",
    "phone",
    "smartWatch",
    "Camera",
    "Headphone",
    "Gaming",
    "Woman’s Fashion",
    "Men’s Fashion",
    "Electronics",
    "Home & Lifestyle",
    "Medicine",
    "Sports & Outdoor",
    "Baby’s & Toys",
    "Groceries & Pets",
    "Health & Beauty"
  ]),
  stock:number().required().min(1).integer() ,
  oldPrice: number().min(0).default(0),
  discount: number().min(0).default(0),
  isNewArrival:boolean() 
});




