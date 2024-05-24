import { Module } from '@nestjs/common';
import { NotificationsRepository } from '../../app/repositories/notification-repository';
import { PrismaNotificationRepository } from './prisma/repositories/prisma-notification-repository';
import { PrismaClientService } from './prisma/services/prisma-client.service';

// Module para os services do banco de dados

@Module({
  providers: [
    PrismaClientService,
    {
      provide: NotificationsRepository,
      useClass: PrismaNotificationRepository,
    },
  ],
  exports: [NotificationsRepository],
})
export class DatabaseModule {}
