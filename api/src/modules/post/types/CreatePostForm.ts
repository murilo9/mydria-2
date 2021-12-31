export default interface CreatePostForm {
  user: string,
  body: {
    text: string,
    picture?: string,
    link?: string
  },
  tags: String[]
}
