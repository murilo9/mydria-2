import Result from "../../../types/Result";
import baseUrl from "../../../utils/baseUrl";
import http from "../../../utils/http";
import Post from "../types/PostData";
import CreatePostForm from "../types/CreatePostForm";

/**
 * Create a post.
 * @param postForm Post form
 * @param userId Logged user id
 * @returns 
 */
export default async function createPost(postForm: CreatePostForm, userId: string): Promise<Result<Post>> {
  const post = {
    ...postForm,
    user: userId
  }
  const url = `${baseUrl}/posts`;
  const createPostResult = await http.post<Post>(url, post);
  return createPostResult;
}