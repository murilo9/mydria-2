import { MoreVert, Reply } from '@mui/icons-material';
import { Card, CardHeader, CardContent, CardActions, Avatar, IconButton, CardMedia, Box, Button, Typography } from '@mui/material';
import React from 'react';
import paella from '../../../assets/paella.jpg';
import DislikeButton from '../../../components/Elements/DislikeButton';
import LikeButton from '../../../components/Elements/LikeButton';

export default function Post() {
  return <>
    <Card sx={{ mb: 2 }} variant="outlined">
      <CardHeader
        avatar={
          <Avatar>M</Avatar>
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
        title="Murilo Henrique"
        subheader="September 14, 2016"
      ></CardHeader>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the mussels,
          if you like.
        </Typography>
      </CardContent>
      <Box sx={{ position: 'relative', height: 0, paddingTop: '100%', overflow: 'hidden' }}>
        <CardMedia
          sx={{ position: 'absolute', top: 0 }}
          component="img"
          image={paella}
          alt="Paella dish"
        />
      </Box>
      <CardActions>
        <LikeButton amount={12} active={false} />
        <DislikeButton amount={5} active={false} />
      </CardActions>
    </Card>
  </>
}