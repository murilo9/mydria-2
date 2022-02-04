import PersistentEntity from '../../system/types/PersistentEntity';

export default interface Share extends PersistentEntity {
  user: string,
  body: {
    text: string,
  },
  tags: String[],
  sharedFrom: string
}
