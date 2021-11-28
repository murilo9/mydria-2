export default interface PostInput {
  user: string,
  body: {
    text: string,
    picture?: string,
    link?: string
  }
}
