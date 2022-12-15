import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// Arquivo principal
async function bootstrap() {
  const app = await NestFactory.create(AppModule); // ? Definindo o module que vai ser usado
  app.useGlobalPipes(new ValidationPipe()); // ? Adicionando erros de validação de dados
  await app.listen(3000); // ? Rodando o server em localhost:3000
}
bootstrap();
