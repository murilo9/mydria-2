import { MoreVert, Reply } from '@mui/icons-material';
import { Card, CardHeader, CardContent, CardActions, Avatar, IconButton, CardMedia, Box, Button, Typography } from '@mui/material';
import React from 'react';
import DislikeButton from '../../../components/Elements/DislikeButton';
import LikeButton from '../../../components/Elements/LikeButton';
import PostData from '../types/PostData';

export default function Post({ created, user, body, tags }: PostData) {
  const postPicture = body.picture ?
    <>
      <Box sx={{ position: 'relative', height: 0, paddingTop: '100%', overflow: 'hidden' }}>
        <CardMedia
          sx={{ position: 'absolute', top: 0 }}
          component="img"
          image={body.picture}
          alt="Paella dish"
        />
      </Box>
    </>
    : null

  return <>
    <Card sx={{ mb: 2 }} variant="outlined">
      <CardHeader
        avatar={
          <Avatar>{user.firstName[0]}</Avatar>
        }
        action={
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
      {postPicture}
      <CardActions>
        <LikeButton amount={12} active={false} />
        <DislikeButton amount={5} active={false} />
      </CardActions>
    </Card>
  </>
}