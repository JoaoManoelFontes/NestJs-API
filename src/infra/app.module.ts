import { Module } from '@nestjs/common';
import { HttpModule } from './http/http.module';
import { DatabaseModule } from './database/database.module';

/* 
Module principal
Onde será definido os controles (rotas) 
e os services (funções)
*/
@Module({
  imports: [HttpModule, DatabaseModule], // ? Usar outros modules importando-os aqui
  controllers: [], // ? Importando os controllers - definição de rotas e middlewares
  providers: [], // ? Importando os services - funções que serão usadas nos controllers
})
export class AppModule {}
