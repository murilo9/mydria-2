import PersistentEntity from "../../../types/PersistentEntity";
import User from "../../account/types/User";

export default interface PostData extends PersistentEntity {
  user: User,
  body: {
    text: string,
    picture?: string,
    link?: string
  },
  tags: String[],

  sharedFrom?: {
    created: Date,
    updated: Date,
    user: User,
    body: {
      text: string,
      picture?: string,
      link?: string
    },
    tags: String[],
  },

  // Indicated whether the current component is a shared post conent or an original post
  resumed: boolean
}
