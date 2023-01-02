import { Notification } from '../../../app/entities/notification';

// Organizando as informações antes de enviar na api

export class NotificationViewModel {
  static toHTTP(notification: Notification) {
    const response = {
      id: notification.getId(),
      content: notification.getContent(),
      tag: notification.getTag(),
      userId: notification.getUserId(),
    };

    if (
      notification.getCanceledAt() != null &&
      notification.getCanceledAt() != undefined
    ) {
      response['canceledAt'] = notification.getCanceledAt();
    }

    if (
      notification.getReadAt() != null &&
      notification.getReadAt() != undefined
    ) {
      response['readAt'] = notification.getReadAt();
    }
    return response;
  }
}
