import Result from "../../../types/Result";
import Post from "../types/PostData";
import http from "../../../utils/http";
import baseUrl from "../../../utils/baseUrl";

/**
 * Get a profile's posts from the server.
 * @returns 
 */
export default async function getProfilePosts(profileId: string): Promise<Result<Post[]>> {
  const getProfilePostsResult = await http.get<Post[]>(`${baseUrl}/profile/${profileId}/posts`);
  return getProfilePostsResult;
}