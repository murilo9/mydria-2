import PersistentEntity from "../../../types/PersistentEntity";
import User from "../../account/types/User";

export default interface PostData extends PersistentEntity {
  user: User,
  body: {
    text: string,
    picture?: string,
    link?: string
  },
  tags: String[]
}
