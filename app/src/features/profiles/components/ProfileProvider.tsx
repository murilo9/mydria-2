import React, { useState } from 'react';
import PostsList from '../../posts/components/PostsList';
import ProfileDetailsColumn from './DetailsColumn';
import ProfileLayout from '../layouts/ProfileLayout';
import HashinTags from '../../../components/misc/HashinTags';

/**
 * A presentational component responsible for the Profile page. It loads and
 * manage its data and fill its layout with the proper components.
 * @returns 
 */
export default function ProfileProvider() {
  const [profilePosts, setProfilePosts] = useState(['a post', 'another post']);
  return <>
    <ProfileLayout
      detailsColumn={<ProfileDetailsColumn />}
      postsList={
        <PostsList posts={profilePosts} />
      }
      sideColumn={<HashinTags />}
    />
  </>
}