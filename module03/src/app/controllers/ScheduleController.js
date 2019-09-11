import { startOfDay, endOfDay, parseISO } from 'date-fns';
import { Op } from 'sequelize';
import Appointment from '../models/Appointment';
import User from '../models/User';

class ScheduleController {
  async index(request, response) {
    const checkUserProvider = await User.findOne({
      where: { id: request.userId, provider: true },
    });
    if (!checkUserProvider) {
      return response
        .status(401)
        .json({ error: 'Only providers can check the schedule' });
    }
    const { date } = request.query;
    const parseDate = parseISO(date);

    const appointments = await Appointment.findAll({
      where: {
        provider_id: request.userId,
        cancelled_at: null,
        date: { [Op.between]: [startOfDay(parseDate), endOfDay(parseDate)] },
      },
      order: ['date'],
    });
    return response.json(appointments);
  }
}

export default new ScheduleController();
