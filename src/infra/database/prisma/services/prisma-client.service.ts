import { Injectable, OnModuleInit, INestApplication } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
/*
Service usada para se conectar com o banco de dados pelo prisma
Não é usada em nenhum controller, por isso é abstrata
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