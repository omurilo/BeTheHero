import * as yup from 'yup';

const createSessionSchema = yup.object().shape({
  body: yup.object({
    email: yup.string().required('Email is a required field').email(),
    password: yup.string().required('Password is a required field'),
  }),
});

export default { createSessionSchema };

/**
 { name, email, password, whatsapp, cidade, uf }
 */
