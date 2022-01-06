import Result from "../../../types/Result";
import Post from "../types/Post";
import http from "../../../utils/http";
import baseUrl from "../../../utils/baseUrl";

/**
 * Get a post from the server.
 * @param postId Post id
 * @returns 
 */
export default async function getPost(postId: string): Promise<Result<Post>> {
  const getPostResult = await http.get<Post>(`${baseUrl}/posts/${postId}`);
  return getPostResult;
}