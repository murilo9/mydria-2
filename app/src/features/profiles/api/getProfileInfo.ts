import Result from "../../../types/Result";
import http from "../../../utils/http";
import baseUrl from "../../../utils/baseUrl";
import User from "../../account/types/User";

/**
 * Get a profile's info from the server.
 * @returns 
 */
export default async function getProfileInfo(profileId: string): Promise<Result<User>> {
  const getProfileResult = await http.get<User>(`${baseUrl}/profile/${profileId}`);
  return getProfileResult;
}