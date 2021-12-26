import NotificationType from './NotificationType';

export default interface CreateNotificationForm {
  type: NotificationType,
  user: string,
  url: string
}
