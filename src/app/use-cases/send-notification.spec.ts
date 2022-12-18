import { SendNotification } from './send-notification-use-case';
import { InMemoryNotificationRespository } from '../repositories/in-memory-notifications-repository';

describe('send notification use case', () => {
  it('should be able to create a new notification object', async () => {
    const notificationsRepository = new InMemoryNotificationRespository();

    const sendNotification = new SendNotification(notificationsRepository);

    const { notification } = await sendNotification.execute({
      userId: 'userId',
      content: 'content',
      tag: 'tag',
    });
    expect(notification).toBeTruthy();
    expect(notificationsRepository.notifications.length).toBeGreaterThanOrEqual(
      1,
    );
    expect(notificationsRepository.notifications[0]).toEqual(notification);
  });
});
