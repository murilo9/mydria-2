import PersistentEntity from '../../system/types/PersistentEntity';
import ReactionType from './ReactionType';

export default interface Reaction extends PersistentEntity {
  user: string,
  resource: string,
  type: ReactionType
}
