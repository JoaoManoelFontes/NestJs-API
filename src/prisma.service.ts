import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { CreateNotificationBody } from './create-notification-body';
import { PrismaClientService } from './prisma-client.service';

/*
Services - todas as funcionalidades que serão usadas na sua api
Serão usadas nos controllers, cada endpoint tem sua função
*/

@Injectable()
export class PrismaService extends PrismaClientService {
  list() {
    /* O this é o objeto prisma
       O notification é a tabela criada 
       O findMany retorna uma lista de todas as notificações salvas
    */
    return this.notification.findMany();
  }

  async create(body: CreateNotificationBody) {
    // ? Criando uma nova notificação

    const { userId, content, tag } = body;

    await this.notification.create({
      data: {
        id: randomUUID(),
        content,
        tag,
        userId,
      },
    });
    // ? Retornando uma mensagem na api
    return 'created';
  }
}
