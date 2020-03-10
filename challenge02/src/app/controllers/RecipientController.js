import * as Yup from 'yup';
import Recipient from '../models/Recipient';

class RecipientController {
  async store(request, response) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.number()
        .required()
        .positive()
        .integer(),
      complement: Yup.string(),
      state: Yup.string().required(),
      city: Yup.string().required(),
      zipCode: Yup.string().required(),
    });

    try {
      await schema.validate(request.body, { abortEarly: false });
    } catch (err) {
      return response
        .status(400)
        .json({ error: 'Validation failed', message: err.errors });
    }

    const savedRecipient = await Recipient.create(request.body);
    return response.json(savedRecipient);
  }

  async update(request, response) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      street: Yup.string(),
      number: Yup.number()
        .positive()
        .integer(),
      complement: Yup.string(),
      state: Yup.string(),
      city: Yup.string(),
      zipCode: Yup.string(),
    });

    try {
      await schema.validate(request.body, { abortEarly: false });
    } catch (err) {
      return response
        .status(400)
        .json({ error: 'Validation failed', message: err.errors });
    }
    const { id } = request.params;
    const recipient = await Recipient.findByPk(id);
    if (recipient) {
      return response.json(await recipient.update(request.body));
    }
    return response
      .status(400)
      .json({ error: `Not found recipient id ${id} to update` });
  }
}

export default new RecipientController();
