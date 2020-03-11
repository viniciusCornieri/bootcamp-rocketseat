import Notification from '../schemas/Notification';
import User from '../models/User';

class NotificationController {
  async index(request, response) {
    /**
     * Check if user is a provider
     */
    const isProvider = await User.findOne({
      where: { id: request.userId, provider: true },
    });

    if (!isProvider) {
      return response
        .status(401)
        .json({ error: 'Only providers have notifications' });
    }

    const notifications = await Notification.find({ user: request.userId })
      .sort({ createdAt: 'desc' })
      .limit(20);

    return response.json(notifications);
  }

  async update(request, response) {
    const notification = await Notification.findByIdAndUpdate(
      request.params.id,
      { read: true },
      { new: true } // returns the new document updated
    );
    return response.json(notification);
  }
}

export default new NotificationController();
