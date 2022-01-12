import { Box, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import React from 'react';
import User from '../../account/types/User';
import FollowButton from './FollowButton';

export default function ProfileCard({ firstName, lastName, pictureUrl, city, country, bio }: User) {
  return <>
    <Card sx={{ display: { xs: 'none', md: 'block' } }} variant="outlined">
      <Box sx={{ paddingTop: '100%', position: 'relative' }}>
        <CardMedia
          sx={{ position: 'absolute', top: 0, height: '100%' }}
          component="img"
          image={pictureUrl as string}
          alt="Paella dish"
        />
      </Box>
      <CardContent sx={{ position: 'relative', marginTop: '-48px', paddingBottom: '16px !important' }}>
        <Card>
          <CardContent>
            <Typography variant="h6">
              {firstName} {lastName}
            </Typography>
            <Typography variant="caption">
              {city}, {country}
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              {bio}
            </Typography>
          </CardContent>
          <CardActions>
            <FollowButton following={false} />
          </CardActions>
        </Card>
      </CardContent>
    </Card>
  </>
}