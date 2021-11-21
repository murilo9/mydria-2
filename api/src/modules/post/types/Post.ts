export default interface Post {
  user: string,
  body: {
    text: string,
    picture?: string,
    link?: string
  }
};
