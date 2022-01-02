import React from 'react';
import Post from './Post';

type PostsListProps = {
  posts: Array<any>,  // TODO use Post type. It's Posts data, NOT Post components!
  children?: any   // The PostForm may go here
}

export default function PostsList({ children, posts }: PostsListProps) {
  return <>
    {children}
    {posts.map(post => <Post />)}
  </>
}