import { Notification } from '../entities/notification';
import { NotificationsRepository } from '../repositories/notification-repository';

export class GetUserNotificationById {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(userId: string): Promise<Notification[]> {
    const notifications = await this.notificationsRepository.findManyByUserId(
      userId,
    );
    return notifications;
  }
}
