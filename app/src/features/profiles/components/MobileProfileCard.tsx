import { PlayArrow, SkipNext, SkipPrevious } from '@mui/icons-material';
import { Box, Card, CardActions, CardContent, CardMedia, Divider, Grid, IconButton, Typography } from '@mui/material';
import React from 'react';
import LayoutDivider from '../../../components/Elements/LayoutDivider';
import User from '../../account/types/User';
import FollowButton from './FollowButton';

export default function MobileProfileCard({ firstName, lastName, pictureUrl, city, country, bio }: User) {
  return <>
    <Card sx={{ display: { xs: 'block', md: 'none' } }} elevation={0}>
      <CardContent sx={{ pt: 1 }}>
        <Grid container>
          <Grid item xs={3}>
            <Card elevation={0} sx={{ paddingTop: '100%', height: '0px', position: 'relative' }}>
              <CardMedia
                sx={{ borderRadius: '50%', position: 'absolute', top: 0, height: '100%' }}
                component="img"
                image={pictureUrl as string}
                alt="Paella dish"
              />
            </Card>
          </Grid>
          <Grid item xs={9}>
            <Card elevation={0} sx={{ pl: { xs: 0, sm: 2 } }}>
              <CardContent sx={{ py: 0 }}>
                <Typography variant="h6">
                  {firstName} {lastName}
                </Typography>
                <Typography variant="caption">
                  {city}, {country}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1, display: { xs: 'none', sm: 'block' } }}>
                  {bio}
                </Typography>
              </CardContent>
              <CardActions sx={{ pt: 2, pl: 2, display: { xs: 'none', sm: 'block' } }}>
                <FollowButton following={false} />
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card elevation={0}>
              <Typography variant="body2" sx={{ mt: 2, display: { xs: 'block', sm: 'none' } }}>
                {bio}
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions sx={{ pt: 2, mb: 2, display: { xs: 'block', sm: 'none' } }}>
        <FollowButton following={false} sx={{ width: 1 }} />
      </CardActions>
    </Card>
    <LayoutDivider sx={{ display: { xs: 'block', md: 'none' } }} />
  </>
}