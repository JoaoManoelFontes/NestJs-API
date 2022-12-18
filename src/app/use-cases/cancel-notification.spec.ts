import { SendNotification } from './send-notification-use-case';
import { InMemoryNotificationRespository } from '../repositories/in-memory-notifications-repository';
import { CancelNotification } from './cancel-notification';
import { IsDefined } from 'class-validator';
import { Notification } from '../entities/notification';

describe('cancel notification use case', () => {
  it('should be able to create a notification object and then cancel it ', async () => {
    const notificationsRepository = new InMemoryNotificationRespository();

    const cancelNotification = new CancelNotification(notificationsRepository);
    const notification = new Notification({
      userId: '123456',
      content: 'content',
      tag: 'tag',
    });

    await notificationsRepository.create(notification);
    await cancelNotification.execute(notification);

    expect(notificationsRepository.notifications[0].getCanceledAt()).toEqual(
      expect.any(Date),
    );
  });
});
