import * as yup from 'yup';

export const orderItemsValidationSchema = yup.object().shape({
  quantity: yup.number().integer().required(),
  created_at: yup.date().required(),
  updated_at: yup.date().required(),
  order_id: yup.string().nullable(),
  menu_item_id: yup.string().nullable(),
});
