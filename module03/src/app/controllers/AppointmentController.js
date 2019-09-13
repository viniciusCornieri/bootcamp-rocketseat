import * as Yup from 'yup';
import { startOfHour, parseISO, isBefore, format, subHours } from 'date-fns';
import pt from 'date-fns/locale/pt';

import User from '../models/User';
import Appointment from '../models/Appointment';
import File from '../models/File';

import Notification from '../schemas/Notification';

class AppointmentController {
  async index(request, response) {
    const { page = 1 } = request.query;

    const appointments = await Appointment.findAll({
      where: {
        user_id: request.userId,
        cancelled_at: null,
      },
      order: ['date'],
      attributes: ['id', 'date'],
      limit: 20,
      offset: (page - 1) * 20,
      include: [
        {
          model: User,
          as: 'provider',
          attributes: ['id', 'name'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'path', 'url'],
            },
          ],
        },
      ],
    });
    response.json(appointments);
  }

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

    /**
     * checks if the user it's making an appointment with itself
     */
    if (provider_id === request.userId) {
      return response
        .status(401)
        .json({ error: 'You can not create an appointment with yourself' });
    }

    /**
     * Check if the date is after the current date
     */
    const hourStart = startOfHour(parseISO(date));
    if (isBefore(hourStart, new Date())) {
      return response
        .status(400)
        .json({ error: 'Past date are not permitted' });
    }

    /**
     * Check date availability
     */
    const checkAvailability = await Appointment.findOne({
      where: {
        provider_id,
        cancelled_at: null,
        date: hourStart,
      },
    });
    if (checkAvailability) {
      return response
        .status(400)
        .json({ error: 'Appointment date is not available' });
    }
    const appointment = await Appointment.create({
      user_id: request.userId,
      provider_id,
      date,
    });

    /**
     * Notify appointment provider
     */
    const user = await User.findByPk(request.userId);
    const formattedDate = format(
      hourStart,
      "'dia' dd 'de' MMMM', às' H:mm'h'",
      { locale: pt }
    );
    await Notification.create({
      content: `Novo agendamento de ${user.name} para ${formattedDate}`,
      user: provider_id,
    });

    return response.json(appointment);
  }

  async delete(request, response) {
    const appointment = await Appointment.findByPk(request.params.id);
    /**
     * checks if the logged user owns the appointment
     */
    if (appointment.user_id !== request.userId) {
      return response.status(401).json({
        error: "You don't have permission to cancel the appointment.",
      });
    }

    const dateWithSub = subHours(appointment.date, 2);
    if (isBefore(dateWithSub, new Date())) {
      return response
        .status(401)
        .json({ error: 'You can only cancel appointments 2 hours in advance' });
    }

    appointment.cancelled_at = new Date();
    await appointment.save();

    return response.json(appointment);
  }
}

export default new AppointmentController();
