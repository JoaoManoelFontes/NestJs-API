import { NotificationsRepository } from '../repositories/notification-repository';
import { Notification } from '../entities/notification';
import { Injectable } from '@nestjs/common';
// Use-case para enviar notificação - use cases representam os processos e serviços de uma aplicação

interface CancelNotificationRequest {
  notification: Notification;
} // ? interface para receber os dados e enviar uma nova notificação

type CancelNotificationResponse = void; // ? interface para retornar a response (pode ser adicionado outros objetos na interface sem alterar o tipo do retorno da função)

@Injectable()
export class CancelNotification {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(
    // ? Método que cria um novo objeto da classe notificação
    notification: Notification,
  ): Promise<CancelNotificationResponse> {
    notification.setCanceledAt();
    await this.notificationsRepository.save(notification);
  }
}
