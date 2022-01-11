import React from 'react';
import Post from './Post';
import PostData from '../types/PostData'

type PostsListProps = {
  posts: PostData[],  // TODO use Post type. It's Posts data, NOT Post components!
  children?: any   // The PostForm may go here
}

export default function PostsList({ children, posts }: PostsListProps) {
  return <>
    {children}
    {
      posts.length ?
        posts.map(post => <Post {...post} key={post._id} />)
        : 'Nothing to show'
    }
  </>
}