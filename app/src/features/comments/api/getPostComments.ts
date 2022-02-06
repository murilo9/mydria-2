import Result from "../../../types/Result";
import baseUrl from "../../../utils/baseUrl";
import http from "../../../utils/http";
import CommentData from "../types/Comment";

export default async function getPostComments(postId: string): Promise<Result<CommentData[]>> {
  const getPostCommentsResult = await http.get<CommentData[]>(`${baseUrl}/post/${postId}/comments`);
  return getPostCommentsResult;
}