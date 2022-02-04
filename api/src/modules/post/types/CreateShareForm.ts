export default interface CreateShareForm {
  user: string,
  body: {
    text: string,
  },
  tags: String[],
  sharedFrom: string
}
