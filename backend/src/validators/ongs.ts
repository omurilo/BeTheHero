import * as yup from 'yup';

const createOngSchema = yup.object().shape({
  body: yup.object({
    name: yup.string().required('Name is a required field'),
    email: yup.string().required('Email is a required field').email(),
    password: yup.string(),
    confirmationPassword: yup.string().when('password', {
      is: (password) => typeof password === 'string',
      then: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Passwords must match')
        .required('Confirmation Password is a required field'),
    }),
    whatsapp: yup.string().required('Whatsapp is a required field'),
    cidade: yup.string().required('City is a required field'),
    uf: yup.string().required('State is a required field'),
  }),
});

const updateOngSchema = yup.object().shape({
  body: yup.object({
    name: yup.string(),
    email: yup.string().required('Email is a required field').email(),
    password: yup.string(),
    confirmationPassword: yup.string().when('password', {
      is: (password) => typeof password === 'string',
      then: yup.string().required('Confirmation Password is a required field'),
    }),
    whatsapp: yup.string(),
    cidade: yup.string(),
    uf: yup.string(),
  }),
});

const deleteOngSchema = yup.object().shape({
  params: yup.object().shape({
    id: yup.string().required('It is necessary provide an ong id'),
  }),
});

export default { createOngSchema, updateOngSchema, deleteOngSchema };

/**
 { name, email, password, whatsapp, cidade, uf }
 */
