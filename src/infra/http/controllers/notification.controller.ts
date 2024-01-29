import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { CreateNotificationBody } from '../dtos/create-notification-body';
import { SendNotification } from '../../../app/use-cases/send-notification-use-case';
import { Param } from '@nestjs/common/decorators';
import { Notification } from '../../../app/entities/notification';
import { GetUserNotificationById } from '../../../app/use-cases/get-user-notification-by-id-use-case';
import { NotificationViewModel } from '../view-models/notification-viel-model';
import { CancelNotification } from '../../../app/use-cases/cancel-notification-use-case';
import { ReadNotification } from '../../../app/use-cases/read-notification-use-case';
import { PrismaNotificationRepository } from '../../database/prisma/repositories/prisma-notification-repository';

// Controller - criando as rotas e endpoints da api

@Controller('notifications')
export class NotificationController {
  constructor(
    private sendNotification: SendNotification,
    private getUserNotificationById: GetUserNotificationById,
    private cancelNotification: CancelNotification,
    private readNotification: ReadNotification,
    private prismaNotificationsRepository: PrismaNotificationRepository,
  ) {}

  // ? Importando os services que serão usados e que já foram importados no module

  // ? Definir o tipo de método http e o endpoint
  @Post()
  async create(@Body() { userId, content, tag }: CreateNotificationBody) {
    const notification = await this.sendNotification.execute({
      userId,
      content,
      tag,
    });

    return NotificationViewModel.toHTTP(notification);
    // ? Pegando o corpo da requisição e definindo o tipo dela
  }

  @Put(':notificationId')
  async update(
    @Param('notificationId') notificationId: string,
    @Body() { userId, content, tag }: CreateNotificationBody,
  ): Promise<void> {
    const notification = new Notification(
      {
        userId,
        content,
        tag,
      },
      notificationId,
    );

    await this.prismaNotificationsRepository.update(notification);
  }

  @Get('users/:userId/')
  async getByUserId(
    @Param('userId') userId: string,
  ): Promise<NotificationViewModel[]> {
    const notifications = await this.getUserNotificationById.execute(userId);

    return notifications.map(NotificationViewModel.toHTTP);
  }

  @Get(':notificationId/')
  async getById(
    @Param('notificationId') notificationId: string,
  ): Promise<NotificationViewModel> {
    const notification = await this.prismaNotificationsRepository.findById(
      notificationId,
    );
    return NotificationViewModel.toHTTP(notification);
  }

  @Get('cancel/:notificationId/')
  async cancel(
    @Param('notificationId') notificationId: string,
  ): Promise<NotificationViewModel> {
    const notification = await this.cancelNotification.execute(notificationId);
    return NotificationViewModel.toHTTP(notification);
  }

  @Get('read/:notificationId/')
  async read(
    @Param('notificationId') notificationId: string,
  ): Promise<NotificationViewModel> {
    const notification = await this.readNotification.execute(notificationId);
    return NotificationViewModel.toHTTP(notification);
  }
}
