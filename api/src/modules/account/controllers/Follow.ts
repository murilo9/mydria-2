import { Request } from 'express';
import Controller from '../../system/types/Controller';
import Result from '../../system/types/Result';
import getFollowingFromDatabase from '../db/getFollowingFromDatabase';
import insertFollowOnDatabase from '../db/insertFollowOnDatabase';
import removeFollowFromDatabase from '../db/removeFollowFromDatabase';
import FollowedBy from '../types/Follow';

export default class FollowController extends Controller {
  async handle(request: Request): Promise<Result<any>> {
    const userId = request.headers['user-id'] as string // Me
    const userToFollow = request.params.userId // Nice person
    const getFollowingList = await getFollowingFromDatabase(userId) // If the nice person is followed by be
    if (getFollowingList.failed) {
      return getFollowingList
    }
    const followingList = getFollowingList.payload
    const alreadyFollowing = followingList.filter((following: FollowedBy) => following.user === userToFollow).length > 0
    if (alreadyFollowing) {
      const unfollow = await removeFollowFromDatabase(userToFollow, userId)
      return unfollow
    }

    const follow = {
      user: userToFollow,
      by: userId,
    }
    const insertFollow = await insertFollowOnDatabase(follow)
    return insertFollow
  }
}
