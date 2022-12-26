import { Notification } from '../entities/notification';

export abstract class NotificationsRepository {
  abstract create(notification: Notification): Promise<void>;
  abstract findById(notificationId: string): Promise<Notification>;
  abstract update(notification: Notification): Promise<void>;
  abstract findManyByUserId(userId: string): Promise<Notification[]>;
}
