import { SendNotification } from './send-notification-use-case';
import { InMemoryNotificationRespository } from '../repositories/in-memory-notifications-repository';
import { CancelNotification } from './cancel-notification-use-case';
import { Notification } from '../entities/notification';
import { makeNotification } from '../factories/make-notifications-factory';

describe('cancel notification use case', () => {
  it('should be able to create a notification object and then cancel it ', async () => {
    const notificationsRepository = new InMemoryNotificationRespository();

    const cancelNotification = new CancelNotification(notificationsRepository);
    const sendNotification = new SendNotification(notificationsRepository);

    const { notification } = await sendNotification.execute({
      userId: '123456',
      content: 'content',
      tag: 'tag',
    });

    await cancelNotification.execute(notification.getId());

    expect(notificationsRepository.notifications[0].getCanceledAt()).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to cancel a not existing notification', async () => {
    const notificationsRepository = new InMemoryNotificationRespository();
    const cancelNotification = new CancelNotification(notificationsRepository);

    const notification = makeNotification();

    expect(() => {
      return cancelNotification.execute(notification.getId());
    }).rejects.toThrowError();
  });
});
