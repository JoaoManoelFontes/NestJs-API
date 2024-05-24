import { Notification } from 'src/app/entities/notification';
import { Notification as RawNotification } from '@prisma/client';

//Mapper para transformar dados (a entidade notificação não é a mesma coisa do schema notificação )

export class NotificationMapper {
  //? Converte um objeto da entidade Notification para um objeto do schema do banco de dados prisma
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
  //? Converte uma notificação do banco de dados para um objeto da entidade Notificação
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
