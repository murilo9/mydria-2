import PersistentEntity from "../../../types/PersistentEntity";
import User from "../../account/types/User";

export default interface Comment extends PersistentEntity {
  post: string,
  user: User,
  body: string
}