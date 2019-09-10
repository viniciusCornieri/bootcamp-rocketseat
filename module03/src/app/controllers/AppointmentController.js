import * as Yup from 'yup';
import User from '../models/User';
import Appointment from '../models/Appointment';

class AppointmentController {
  async store(request, response) {
    const schema = Yup.object().shape({
      provider_id: Yup.number().required(),
      date: Yup.date().required(),
    });

    await schema.validate(request.body).catch(err => {
      return response
        .status(400)
        .json({ error: 'Validation fails', message: err.errors });
    });

    const { provider_id, date } = request.body;

    /**
     * Check if provider_id is a provider
     */

    const isProvider = await User.findOne({
      where: { id: provider_id, provider: true },
    });

    if (!isProvider) {
      return response
        .status(401)
        .json({ error: 'You can only create appointment with providers' });
    }

    const appointment = await Appointment.create({
      user_id: request.user_id,
      provider_id,
      date,
    });
    return response.json(appointment);
  }
}

export default new AppointmentController();
