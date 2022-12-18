import { NotificationsRepository } from '../repositories/notification-repository';
import { Notification } from '../entities/notification';
import { Injectable } from '@nestjs/common';
// Use-case para enviar notificação - use cases representam os processos e serviços de uma aplicação

interface SendNotificationRequest {
  userId: string;
  content: string;
  tag: string;
} // ? interface para receber os dados e enviar uma nova notificação

interface SendNotificationResponse {
  notification: Notification;
} // ? interface para retornar a response (pode ser adicionado outros objetos na interface sem alterar o tipo do retorno da função)

@Injectable()
export class SendNotification {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(
    // ? Método que cria um novo objeto da classe notificação
    req: SendNotificationRequest,
  ): Promise<SendNotificationResponse> {
    const { userId, content, tag } = req;

    const notification = new Notification({
      userId,
      content,
      tag,
    });

    await this.notificationsRepository.create(notification);

    return { notification };
  }
}
