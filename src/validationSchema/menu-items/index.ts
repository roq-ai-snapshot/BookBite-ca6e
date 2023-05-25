import * as yup from 'yup';
import { orderItemsValidationSchema } from 'validationSchema/order-items';

export const menuItemsValidationSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required(),
  price: yup.number().integer().required(),
  image_url: yup.string(),
  created_at: yup.date().required(),
  updated_at: yup.date().required(),
  restaurant_id: yup.string().nullable(),
  order_items: yup.array().of(orderItemsValidationSchema),
});
