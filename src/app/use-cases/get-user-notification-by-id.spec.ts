import { makeNotification } from '../factories/make-notifications-factory';
import { InMemoryNotificationRespository } from '../repositories/in-memory-notifications-repository';
import { GetUserNotificationById } from './get-user-notification-by-id-use-case';

//Testes para o use-case de pegar as notificações pelo userId

describe('Get notifications by userId', () => {
  it('should be able to return a list of my userId notifications', async () => {
    const notificationsRepository = new InMemoryNotificationRespository();
    const getUserNotificationById = new GetUserNotificationById(
      notificationsRepository,
    );

    const notification1 = makeNotification({ userId: 'user1' });
    const notification2 = makeNotification({ userId: 'user2' });
    const notification3 = makeNotification({ userId: 'user1' });

    await notificationsRepository.create(notification1);
    await notificationsRepository.create(notification2);
    await notificationsRepository.create(notification3);

    const notifications = await getUserNotificationById.execute('user1');

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([notification1, notification3]),
    );
  });
});
