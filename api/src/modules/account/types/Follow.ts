import PersistentEntity from '../../system/types/PersistentEntity';

export default interface Follow extends PersistentEntity {
  user: string,
  by: string
}
