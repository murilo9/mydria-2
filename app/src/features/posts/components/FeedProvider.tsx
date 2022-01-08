import React, { useEffect, useState } from 'react';
import PostForm from './PostForm';
import PostsList from './PostsList';
import FeedLayout from '../layouts/FeedLayout';
import HashinTags from '../../../components/misc/HashinTags';
import getFeed from '../api/getFeed';
import PostData from '../types/PostData';

export default function FeedProvider() {
  const [feedPosts, setFeedPosts] = useState<PostData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFeed().then(feedResult => {
      if (feedResult.failed) {
        console.log('error :c')
      }
      else {
        setFeedPosts(feedResult.payload as PostData[])
      }
      setLoading(false)
    })
  }, [])

  return <>
    {
      loading ? 'Loading Feed...' :
        <FeedLayout
          postsList={
            <PostsList posts={feedPosts}>
              <PostForm />
            </PostsList>
          }
          sideColumn={<HashinTags />}
        />
    }
  </>
}