import PersistentEntity from '../../system/types/PersistentEntity';

export default interface Comment extends PersistentEntity {
  post: string,
  user: string,
  body: string
}
