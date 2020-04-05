import * as yup from 'yup';

const createIncidentSchema = yup.object().shape({
  body: yup.object({
    title: yup.string().required('Title is a required field'),
    description: yup.string().required('Description is a required field'),
    value: yup.number().required('Value is a required field'),
  }),
});

const updateIncidentSchema = yup.object().shape({
  body: yup.object({
    title: yup.string(),
    description: yup.string(),
    value: yup.number(),
  }),
  params: yup.object({
    id: yup.string().required('It is necessary provide an incident id'),
  }),
});

const deleteIncidentSchema = yup.object().shape({
  params: yup.object({
    id: yup.string().required('It is necessary provide an incident id'),
  }),
});

export default {
  createIncidentSchema,
  updateIncidentSchema,
  deleteIncidentSchema,
};
