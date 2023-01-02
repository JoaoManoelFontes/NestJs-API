import { Injectable } from '@nestjs/common';
import { NotificationNotFound } from 'src/app/errors/notification-error';
import { Notification } from '../../../../app/entities/notification';
import { NotificationsRepository } from '../../../../app/repositories/notification-repository';
import { NotificationMapper } from '../mappers/notification-mapper';
import { PrismaClientService } from '../services/prisma-client.service';

// Fazendo as querys com o banco de dados prisma

@Injectable()
export class PrismaNotificationRepository implements NotificationsRepository {
  constructor(private prismaService: PrismaClientService) {}

  async create(notification: Notification): Promise<void> {
    const rawData = NotificationMapper.toPrisma(notification);

    await this.prismaService.notification.create({
      data: rawData,
    });
  }

  async update(notification: Notification): Promise<void> {
    const rawData = NotificationMapper.toPrisma(notification);

    await this.prismaService.notification.update({
      where: {
        id: rawData.id,
      },
      data: rawData,
    });
  }

  async findById(notificationId: string): Promise<Notification> {
    console.log(notificationId);
    const notification = await this.prismaService.notification.findUnique({
      where: { id: notificationId },
    });
    if (!notification) {
      throw new NotificationNotFound();
    }

    return NotificationMapper.toDomain(notification);
  }

  async findManyByUserId(userId: string): Promise<Notification[]> {
    const notifications = await this.prismaService.notification.findMany({
      where: {
        userId,
      },
    });

    return notifications.map(NotificationMapper.toDomain);
  }
}
