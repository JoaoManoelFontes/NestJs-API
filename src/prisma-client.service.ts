import { Injectable, OnModuleInit, INestApplication } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
/*
Services - todas as funcionalidades que serão usadas na sua api
Serão usadas nos controllers, cada endpoint tem sua função
*/

@Injectable()
export class PrismaClientService extends PrismaClient implements OnModuleInit {
  // ? Criando service pra conectar com o prisma ORM

  // Funções genéricas - Quando se conectar & se o banco de dados se disconectar inesperadamente
  async onModuleInit() {
    await this.$connect();
    console.log('[prisma] database connected');
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
