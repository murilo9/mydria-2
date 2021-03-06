export default interface UpdatePostForm {
  body: {
    text: string,
    picture?: string,
    link?: string
  },
  tags: String[],
  shared?: string
}
