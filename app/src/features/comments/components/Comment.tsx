import { Avatar, Card, CardActions, CardContent, CardHeader, Typography } from '@mui/material';
import React from 'react';
import DislikeButton from '../../../components/Elements/DislikeButton';
import LikeButton from '../../../components/Elements/LikeButton';
import CommentProps from '../types/Comment';

export default function Comment({ user, body, created }: CommentProps) {
  return <>
    <Card elevation={0} sx={{ marginTop: 2, backgroundColor: '#F8F9FA' }}>
      <CardHeader
        avatar={<Avatar>{user.firstName[0]}</Avatar>}
        title={<Typography variant="subtitle1" sx={{ fontWeight: 300, lineHeight: 1.25 }}>{`${user.firstName} ${user.lastName}`}</Typography>}
        subheader={<Typography variant="caption" color="text.secondary">{new Date(created).toDateString()}</Typography>}
        sx={{ paddingBottom: 1 }}
      >
      </CardHeader>
      <CardContent sx={{ paddingLeft: 9, paddingY: 0 }}>
        <Typography variant="body2">
          {body}
        </Typography>
      </CardContent>
      <CardActions sx={{ paddingLeft: 9, justifyContent: { xs: 'end', md: 'start' }, flexDirection: { xs: 'row-reverse', md: 'row' } }}>
        <LikeButton amount={12} active={false} sx={{ ml: { xs: 1, md: 0 } }} />
        <DislikeButton amount={5} active={false} />
      </CardActions>
    </Card>
  </>
}