import { Module } from '@nestjs/common';
import { ReadNotification } from '../../app/use-cases/read-notification-use-case';
import { CancelNotification } from '../../app/use-cases/cancel-notification-use-case';
import { GetUserNotificationById } from '../../app/use-cases/get-user-notification-by-id-use-case';
import { SendNotification } from '../../app/use-cases/send-notification-use-case';
import { DatabaseModule } from '../database/database.module';
import { NotificationController } from './controllers/notification.controller';
import { PrismaNotificationRepository } from '../database/prisma/repositories/prisma-notification-repository';
import { PrismaClientService } from '../database/prisma/services/prisma-client.service';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationController],
  providers: [
    SendNotification,
    GetUserNotificationById,
    CancelNotification,
    ReadNotification,
    PrismaNotificationRepository,
    PrismaClientService,
  ],
})
export class HttpModule {}
