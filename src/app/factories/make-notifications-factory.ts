import { Notification, NotificationProps } from '../entities/notification';

// Função que cria uma nova notificação automaticamente - usada para testes

type Override = Partial<NotificationProps>;

export function makeNotification(override: Override = {}): Notification {
  return new Notification({
    userId: '123456',
    content: 'content',
    tag: 'tag',
    ...override,
  });
}
