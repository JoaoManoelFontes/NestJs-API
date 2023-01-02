import { NotificationsRepository } from '../repositories/notification-repository';
import { Notification } from '../entities/notification';
import { Injectable } from '@nestjs/common';

// use-case para visualizar uma notificação

@Injectable()
export class ReadNotification {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(
    // ? Método que cria um novo objeto da classe notificação
    notificationId: string,
  ): Promise<Notification> {
    const notification = await this.notificationsRepository.findById(
      notificationId,
    );

    notification.setReadAt();
    await this.notificationsRepository.update(notification);

    return notification;
  }
}
