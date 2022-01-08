import Result from "../../../types/Result";
import baseUrl from "../../../utils/baseUrl";
import http from "../../../utils/http";
import Post from "../types/PostData";
import UpdatePostForm from "../types/UpdatePostForm";

/**
 * Update a post.
 * @param postForm Post form
 * @param userId Logged user id
 * @returns 
 */
export default async function updatePost(postForm: UpdatePostForm, userId: string): Promise<Result<Post>> {
  const post = {
    ...postForm,
    user: userId
  }
  const url = `${baseUrl}/post/${postForm._id}`;
  const updatePostResult = await http.put<Post>(url, post);
  return updatePostResult;
}