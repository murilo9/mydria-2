import Result from "../../../types/Result";
import http from "../../../utils/http";
import baseUrl from "../../../utils/baseUrl";

/**
 * Delete a post from the server.
 * @param postId Post id
 * @returns 
 */
export default async function deletePost(postId: string): Promise<Result<boolean>> {
  const url = `${baseUrl}/post/${postId}`
  const deletePostResult = await http.delette<boolean>(url);
  return deletePostResult;
}