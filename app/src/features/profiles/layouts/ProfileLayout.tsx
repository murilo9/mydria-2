import { Grid } from '@mui/material';
import React, { ReactElement } from 'react';

type ProfileLayoutProps = {
  detailsColumn: ReactElement,
  postsList: ReactElement
}

const ProfileLayout: React.FC<ProfileLayoutProps> = ({ detailsColumn, postsList }: ProfileLayoutProps) => {
  return <>
    <Grid container sx={{ pt: 3 }} spacing={3}>
      <Grid item xs={12} md={4} lg={3}>
        {detailsColumn}
      </Grid>
      <Grid item xs={12} md={8} lg={6}>
        {postsList}
      </Grid>
    </Grid>
  </>
}

export default ProfileLayout;