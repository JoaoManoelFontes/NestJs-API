import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateNotificationBody } from './create-notification-body';
import { PrismaService } from './prisma.service';

// Controllers - criando as rotas e endpoints da api
@Controller()
export class AppController {
  constructor(private readonly prisma: PrismaService) {} // ? Importando os services que serão usados, e que já foram importados no module

  @Get('database') // ? Definir o tipo de método http e o endpoint
  list() {
    return this.prisma.list(); // ? função do service que foi importado na classe e no module
  }

  @Post()
  create(@Body() body: CreateNotificationBody) {
    // ? Pegando o corpo da requisição e definindo o tipo dela
    return this.prisma.create(body);
  }
}
