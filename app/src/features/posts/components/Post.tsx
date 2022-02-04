import { MoreVert, Reply } from '@mui/icons-material';
import { Card, CardHeader, CardContent, CardActions, Avatar, IconButton, CardMedia, Box, Button, Typography } from '@mui/material';
import React from 'react';
import DislikeButton from '../../../components/Elements/DislikeButton';
import LikeButton from '../../../components/Elements/LikeButton';
import PostData from '../types/PostData';

export default function Post({ created, user, body, tags, sharedFrom, resumed }: PostData) {
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

  const sharedPost = sharedFrom ?
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
        title={`${user.firstName} ${user.lastName}`}
        subheader={new Date(created).toDateString()}
      ></CardHeader>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {body.text}
        </Typography>
      </CardContent>
      {postPicture || sharedPost}
      {
        !resumed ?
          <CardActions sx={{ justifyContent: { xs: 'end', md: 'start' }, flexDirection: { xs: 'row-reverse', md: 'row' } }}>
            <LikeButton amount={12} active={false} sx={{ ml: { xs: 1, md: 0 } }} />
            <DislikeButton amount={5} active={false} />
          </CardActions>
          : null
      }
    </Card>
  </>
}