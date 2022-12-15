import { IsNotEmpty, IsUUID, Length } from 'class-validator';

// Classe de notificação para definir o tipo de corpo que vai ser recebido pelas requisições
export class CreateNotificationBody {
  @IsNotEmpty() // ? Decorators para validação de dados
  @IsUUID()
  userId: string;

  @IsNotEmpty()
  @Length(5, 240)
  content: string;

  @IsNotEmpty()
  tag: string;
}
