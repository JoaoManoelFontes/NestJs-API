import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaService } from './prisma.service';

/* 
Module principal
Onde será definido os controles (rotas) 
e os services (funções)
*/
@Module({
  imports: [], // ? Usar outros modules importando-os aqui
  controllers: [AppController], // ? Importando os controllers - definição de rotas e middlewares
  providers: [PrismaService], // ? Importando os services - funções que serão usadas nos controllers
})
export class AppModule {}
