import * as Joi from '@hapi/joi';

export const CreateDogSchemaValidtor = Joi.object({
  name: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),

  age: Joi.number()
    .integer()
    .required(),

  breed: Joi.string().optional(),
});
