import PersistentEntity from '../../system/types/PersistentEntity';
import NotificationType from './NotificationType';

export default interface Notification extends PersistentEntity {
  type: NotificationType,
  user: string,
  url: string,
  seen: boolean
}
