export default interface UpdatePostForm {
  _id: string,
  body: {
    text: string,
    picture?: string,
    link?: string
  },
  tags: String[]
}