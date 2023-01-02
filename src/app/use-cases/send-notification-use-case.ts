import { NotificationsRepository } from '../repositories/notification-repository';
import { Notification } from '../entities/notification';
import { Injectable } from '@nestjs/common';

// Use-case para enviar notificação

interface SendNotificationRequest {
  userId: string;
  content: string;
  tag: string;
} // ? interface para receber os dados

@Injectable()
export class SendNotification {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(
    // ? Método que cria um novo objeto da classe notificação
    req: SendNotificationRequest,
  ): Promise<Notification> {
    const { userId, content, tag } = req;

    const notification = new Notification({
      userId,
      content,
      tag,
    });

    await this.notificationsRepository.create(notification);

    return notification;
  }
}
