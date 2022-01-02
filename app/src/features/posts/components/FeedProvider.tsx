import React, { useState } from 'react';
import PostForm from './PostForm';
import PostsList from './PostsList';
import FeedLayout from '../layouts/FeedLayout';
import HashinTags from '../../../components/misc/HashinTags';

export default function FeedProvider() {
  const [feedPosts, setFeedPosts] = useState(['a post', 'another post']);
  return <>
    <FeedLayout
      postsList={
        <PostsList posts={feedPosts}>
          <PostForm />
        </PostsList>
      }
      sideColumn={<HashinTags />}
    />
  </>
}