import { Notification } from 'src/app/entities/notification';

export class NotificationMapper {
  static toPrisma(notification: Notification) {
    return {
      id: notification.getId(),
      userId: notification.getUserId(),
      content: notification.getContent(),
      tag: notification.getTag(),
      readAt: notification.getReadAt(),
    };
  }
}
