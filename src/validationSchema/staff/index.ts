import * as yup from 'yup';

export const staffValidationSchema = yup.object().shape({
  role: yup.string().required(),
  created_at: yup.date().required(),
  updated_at: yup.date().required(),
  user_id: yup.string().nullable(),
  restaurant_id: yup.string().nullable(),
});
