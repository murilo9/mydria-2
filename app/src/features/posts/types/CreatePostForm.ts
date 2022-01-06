export default interface CreatePostForm {
  _id?: string,
  body: {
    text: string,
    picture?: string,
    link?: string
  },
  tags: String[]
}