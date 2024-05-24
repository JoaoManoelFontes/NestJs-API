import { Injectable } from '@nestjs/common';
import { Notification } from '../entities/notification';
import { NotificationsRepository } from '../repositories/notification-repository';

// Use-case que retorna as notificações de um usuário

@Injectable()
export class GetUserNotificationById {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(userId: string): Promise<Notification[]> {
    const notifications = await this.notificationsRepository.findManyByUserId(
      userId,
    );

    return notifications;
  }
}
