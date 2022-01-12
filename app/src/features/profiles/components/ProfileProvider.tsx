import React, { useEffect, useState } from 'react';
import PostsList from '../../posts/components/PostsList';
import ProfileDetailsColumn from './DetailsColumn';
import ProfileLayout from '../layouts/ProfileLayout';
import HashinTags from '../../../components/misc/HashinTags';
import getProfilePosts from '../../posts/api/getProfilePosts';
import PostData from '../../posts/types/PostData';
import { useParams } from 'react-router';
import getProfileInfo from '../api/getProfileInfo';
import User from '../../account/types/User';

/**
 * A presentational component responsible for the Profile page. It loads and
 * manages its data and fills its layout with the proper components.
 * @returns 
 */
export default function ProfileProvider() {
  const [profileInfo, setProfileInfo] = useState<User>()
  const [profilePosts, setProfilePosts] = useState<PostData[]>([])
  const [loadingPosts, setLoadingPosts] = useState(true)
  const [loadingProfile, setLoadingProfile] = useState(true)
  const profileId = useParams().userId as string

  useEffect(() => {
    getProfileInfo(profileId).then(profileInfoResult => {
      if (profileInfoResult.failed) {
        console.log('error loading profile data')
      }
      else {
        setProfileInfo(profileInfoResult.payload)
        setLoadingProfile(false)
      }

    })
    getProfilePosts(profileId).then(profilePostsResult => {
      if (profilePostsResult.failed) {
        console.log('error loading profile posts')
      }
      else {
        setProfilePosts(profilePostsResult.payload as PostData[])
        setLoadingPosts(false)
      }
    })
  }, [])
  return <>
    {
      loadingProfile ?
        '' :
        <ProfileLayout
          detailsColumn={<ProfileDetailsColumn user={profileInfo as User} />}
          postsList={
            loadingPosts ?
              <>Loading posts...</> :
              <PostsList posts={profilePosts} />
          }
          sideColumn={<HashinTags />}
        />
    }
  </>
}