import ReactionType from './ReactionType';

export default interface ReactionForm {
  user: string,
  resource: string,
  type: ReactionType
}
