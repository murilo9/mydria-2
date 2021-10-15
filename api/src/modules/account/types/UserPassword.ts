import PersistentEntity from '../../system/types/PersistentEntity';

export interface UserPassword extends PersistentEntity {
  hash: string,
  userId: string
}
