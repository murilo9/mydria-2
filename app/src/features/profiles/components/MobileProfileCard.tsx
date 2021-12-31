import { PlayArrow, SkipNext, SkipPrevious } from '@mui/icons-material';
import { Box, Card, CardActions, CardContent, CardMedia, Divider, Grid, IconButton, Typography } from '@mui/material';
import React from 'react';
import person from '../../../assets/person.jpg';
import FollowButton from './FollowButton';

export default function MobileProfileCard() {
  return <>
    <Card sx={{ display: { xs: 'flex', md: 'none' } }} elevation={0}>
      <CardContent sx={{ pt: 1 }}>
        <Grid container>
          <Grid item xs={3}>
            <Card elevation={0}>
              <CardMedia
                sx={{ borderRadius: '50%' }}
                component="img"
                image={person}
                alt="Paella dish"
              />
            </Card>
          </Grid>
          <Grid item xs={9}>
            <Card elevation={0} sx={{ pl: { xs: 0, sm: 2 } }}>
              <CardContent sx={{ py: 0 }}>
                <Typography variant="h6">
                  Murilo Henrique
                </Typography>
                <Typography variant="caption">
                  Curitiba, Brazil
                </Typography>
                <Typography variant="body2" sx={{ mt: 1, display: { xs: 'none', sm: 'block' } }}>
                  Vestibulum porttitor in enim quis accumsan. Etiam bibendum augue pretium magna tincidunt.
                </Typography>
              </CardContent>
              <CardActions sx={{ pt: 2, display: { xs: 'none', sm: 'block' } }}>
                <FollowButton following={true} />
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card elevation={0}>
              <Typography variant="body2" sx={{ mt: 2, display: { xs: 'block', sm: 'none' } }}>
                Vestibulum porttitor in enim quis accumsan. Etiam bibendum augue pretium magna tincidunt.
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
    <Box sx={{ display: { xs: 'block', md: 'none' } }}>
      <Divider />
      <Divider sx={{ mt: 1 }} />
    </Box>
  </>
}