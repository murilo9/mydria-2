import PersistentEntity from '../../system/types/PersistentEntity';

export default interface Post extends PersistentEntity {
  user: string,
  body: {
    text: string,
    picture?: string,
    link?: string
  }
}
