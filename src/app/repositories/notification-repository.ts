import { Notification } from '../entities/notification';

// Classe abstrata que é implementada em outras classes que conectam com o banco de dados e usam esses métodos de acordo com o ORM

export abstract class NotificationsRepository {
  abstract create(notification: Notification): Promise<void>;
  abstract findById(notificationId: string): Promise<Notification>;
  abstract update(notification: Notification): Promise<void>;
  abstract findManyByUserId(userId: string): Promise<Notification[]>;
}
