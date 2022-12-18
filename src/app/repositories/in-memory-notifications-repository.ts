import { Notification } from '../entities/notification';
import { NotificationsRepository } from './notification-repository';

export class InMemoryNotificationRespository
  implements NotificationsRepository
{
  public notifications: Notification[] = [];

  async findById(notificationId: string): Promise<Notification | null> {
    const notification = this.notifications.find(
      (item) => item.getId() === notificationId,
    );

    if (!notification) return null;

    return notification;
  }

  async create(notification: Notification) {
    this.notifications.push(notification);
  }

  async save(notification: Notification): Promise<void> {
    const notificationId = this.notifications.findIndex(
      (item) => item.getId() === notification.getId(),
    );

    if (notificationId < 0) {
      this.notifications.push(notification);
    } else {
      this.notifications[notificationId] = notification;
    }
    console.log(this.notifications[notificationId]);
  }
}
