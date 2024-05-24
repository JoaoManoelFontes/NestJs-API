// Construindo erro caso a query da notificação seja inválida

export class NotificationNotFound extends Error {
  constructor() {
    super('Notification not found.');
  }
}
