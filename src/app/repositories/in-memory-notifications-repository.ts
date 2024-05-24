import { Notification } from '../entities/notification';
import { NotificationNotFound } from '../errors/notification-error';
import { NotificationsRepository } from './notification-repository';

// Simulando um banco de dados para os testes dos use-cases
export class InMemoryNotificationRespository
  implements NotificationsRepository
{
  public notifications: Notification[] = [];

  async create(notification: Notification) {
    this.notifications.push(notification);
  }

  async update(notification: Notification): Promise<void> {
    const notificationId = this.notifications.findIndex(
      (item) => item.getId() === notification.getId(),
    );

    if (notificationId < 0) {
      throw new NotificationNotFound();
    } else {
      this.notifications[notificationId] = notification;
    }
  }

  async findById(notificationId: string): Promise<Notification> {
    const notification = this.notifications.find(
      (e) => e.getId() === notificationId,
    );

    if (!notification) {
      throw new NotificationNotFound();
    }

    return notification;
  }

  async findManyByUserId(userId: string): Promise<Notification[]> {
    const notificationList = this.notifications.filter(
      (e) => e.getUserId() === userId,
    );
    console.log('id: ' + userId);

    return notificationList;
  }
}
