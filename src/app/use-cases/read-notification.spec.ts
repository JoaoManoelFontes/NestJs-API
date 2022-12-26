import { SendNotification } from './send-notification-use-case';
import { InMemoryNotificationRespository } from '../repositories/in-memory-notifications-repository';
import { makeNotification } from '../factories/make-notifications-factory';
import { ReadNotification } from './read-notification-use-case';

describe('read notification use case', () => {
  it('should be able to create a notification object and then read it ', async () => {
    const notificationsRepository = new InMemoryNotificationRespository();

    const readNotification = new ReadNotification(notificationsRepository);
    const sendNotification = new SendNotification(notificationsRepository);

    const { notification } = await sendNotification.execute({
      userId: '123456',
      content: 'content',
      tag: 'tag',
    });

    await readNotification.execute(notification.getId());

    expect(notificationsRepository.notifications[0].getReadAt()).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to cancel a not existing notification', async () => {
    const notificationsRepository = new InMemoryNotificationRespository();
    const readNotification = new ReadNotification(notificationsRepository);

    const notification = makeNotification();

    expect(() => {
      return readNotification.execute(notification.getId());
    }).rejects.toThrowError();
  });
});
