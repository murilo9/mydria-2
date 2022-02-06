import { MoreVert, Reply } from '@mui/icons-material';
import { Card, CardHeader, CardContent, CardActions, Avatar, IconButton, CardMedia, Box, Button, Typography, Paper, Link } from '@mui/material';
import React, { useEffect, useState } from 'react';
import DislikeButton from '../../../components/Elements/DislikeButton';
import LikeButton from '../../../components/Elements/LikeButton';
import PostData from '../types/PostData';
import CommentData from '../../comments/types/Comment';
import CommentsButton from '../../../components/Elements/CommentsButton';
import getPostComments from '../../comments/api/getPostComments';
import CommentsSection from './CommentsSection';

export default function Post({ created, user, body, tags, _id, sharedFrom, resumed }: PostData) {
  const [comments, setComments] = useState([] as CommentData[])

  const [loadingComments, setLoadingComments] = useState(false)
  const [commentsError, setCommentsError] = useState('')

  // Loads comments from server
  const loadComments = async () => {
    getPostComments(_id).then(getCommentsResult => {
      if (getCommentsResult.failed) {
        setCommentsError('There was an error while loading the comments.')
      }
      else {
        const comments = getCommentsResult.payload
        setComments(comments)
      }
      setLoadingComments(false)
    })
  }

  // Loads post comments
  const onShowCommentsClick = () => {
    setLoadingComments(true)
    loadComments()
  }

  const postPicture = body.picture ?
    <>
      <Box sx={{ position: 'relative', height: 0, paddingTop: '70%', overflow: 'hidden' }}>
        <CardMedia
          sx={{ position: 'absolute', top: 0, height: '100%' }}
          component="img"
          image={body.picture}
          alt="Paella dish"
        />
      </Box>
    </>
    : null

  const sharedPost = sharedFrom !== undefined ?
    <Post {...sharedFrom} resumed />
    : null

  return <>
    <Card sx={{ mb: 2, mx: (resumed ? 2 : null) }} variant="outlined">
      <CardHeader
        avatar={
          <Avatar>{user.firstName[0]}</Avatar>
        }
        action={
          resumed ?
            null
            :
            <>
              <IconButton sx={{ display: { xs: 'initial', sm: 'none' } }}>
                <Reply />
              </IconButton>
              <Button sx={{ display: { xs: 'none', sm: 'inline' } }}>Share</Button>
              <IconButton aria-label="settings">
                <MoreVert />
              </IconButton>
            </>
        }
        title={<Typography variant="subtitle1" sx={{ fontWeight: 500 }}>{`${user.firstName} ${user.lastName}`}</Typography>}
        subheader={<Typography variant="caption" color="text.secondary">{new Date(created).toDateString()}</Typography>}
      ></CardHeader>
      <CardContent sx={{ paddingBottom: 1, paddingTop: 0 }}>
        <Typography variant="body2">
          {body.text}
        </Typography>
      </CardContent>
      {postPicture || sharedPost}
      {
        !resumed ?  /* Shows post actions section only if not on mini-post */
          <CardActions sx={{ justifyContent: { xs: 'end', md: 'start' }, flexDirection: { xs: 'row-reverse', md: 'row' } }}>
            <LikeButton amount={12} active={false} sx={{ ml: { xs: 1, md: 0 } }} />
            <DislikeButton amount={5} active={false} sx={{ ml: { xs: 1, md: 0 } }} />
            <CommentsButton amount={comments.length} onClick={onShowCommentsClick} />
          </CardActions>
          : null
      }
      {
        !resumed ?
          <CommentsSection loadingComments={loadingComments} comments={comments} error={commentsError} />
          : null
      }
    </Card>
  </>
}