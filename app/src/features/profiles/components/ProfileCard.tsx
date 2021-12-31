import { Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import React from 'react';
import person from '../../../assets/person.jpg';
import FollowButton from './FollowButton';

export default function ProfileCard() {
  return <>
    <Card sx={{ display: { xs: 'none', md: 'block' } }} variant="outlined">
      <CardMedia
        component="img"
        image={person}
        alt="Paella dish"
      />
      <CardContent sx={{ position: 'relative', marginTop: '-48px', paddingBottom: '16px !important' }}>
        <Card elevation={0} variant="outlined">
          <CardContent>
            <Typography variant="h6">
              Murilo Henrique
          </Typography>
            <Typography variant="caption">
              Curitiba, Brazil
          </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              Vestibulum porttitor in enim quis accumsan. Etiam bibendum augue pretium magna tincidunt.
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