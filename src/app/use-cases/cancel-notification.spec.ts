import { InMemoryNotificationRespository } from '../repositories/in-memory-notifications-repository';
import { CancelNotification } from './cancel-notification-use-case';
import { makeNotification } from '../factories/make-notifications-factory';

// Testes para o use-case de cancelar notificação

describe('cancel notification use case', () => {
  it('should be able to create a notification object and then cancel it ', async () => {
    const notificationsRepository = new InMemoryNotificationRespository();
    const cancelNotification = new CancelNotification(notificationsRepository);
    const notification = makeNotification();

    await notificationsRepository.create(notification);

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
