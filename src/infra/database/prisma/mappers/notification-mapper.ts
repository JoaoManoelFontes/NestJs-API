import { Notification } from 'src/app/entities/notification';
import { Notification as RawNotification } from '@prisma/client';
export class NotificationMapper {
  static toPrisma(notification: Notification) {
    return {
      id: notification.getId(),
      userId: notification.getUserId(),
      content: notification.getContent(),
      tag: notification.getTag(),
      readAt: notification.getReadAt(),
      canceledAt: notification.getCanceledAt(),
    };
  }

  static toDomain(raw: RawNotification): Notification {
    return new Notification(
      {
        tag: raw.tag,
        content: raw.content,
        userId: raw.userId,
        readAt: raw.readAt,
        canceledAt: raw.canceledAt,
        createdAt: raw.createdAt,
      },
      raw.id,
    );
  }
}
