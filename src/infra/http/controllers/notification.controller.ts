import { Body, Controller, Patch, Post } from '@nestjs/common';
import { CreateNotificationBody } from '../dtos/create-notification-body';
import { SendNotification } from '../../../app/use-cases/send-notification-use-case';

// Controllers - criando as rotas e endpoints da api
@Controller('notifications')
export class NotificationController {
  constructor(private sendNotification: SendNotification) {}

  // ? Importando os services que serão usados, e que já foram importados no module

  // ? Definir o tipo de método http e o endpoint
  @Post()
  async create(@Body() { userId, content, tag }: CreateNotificationBody) {
    const { notification } = await this.sendNotification.execute({
      userId,
      content,
      tag,
    });

    return { notification };
    // ? Pegando o corpo da requisição e definindo o tipo dela
  }
}
