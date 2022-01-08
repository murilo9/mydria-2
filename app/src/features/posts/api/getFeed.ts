import Result from "../../../types/Result";
import Post from "../types/PostData";
import http from "../../../utils/http";
import baseUrl from "../../../utils/baseUrl";

/**
 * Get a feed posts from the server.
 * @returns 
 */
export default async function getFeed(): Promise<Result<Post[]>> {
  const getFeedResult = await http.get<Post[]>(`${baseUrl}/feed`);
  return getFeedResult;
}