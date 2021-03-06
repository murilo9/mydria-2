import { Grid } from '@mui/material';
import React, { ReactElement } from 'react';

type ProfileLayoutProps = {
  detailsColumn: ReactElement,
  postsList: ReactElement,
  sideColumn: ReactElement
}

const ProfileLayout: React.FC<ProfileLayoutProps> = ({ detailsColumn, postsList, sideColumn }: ProfileLayoutProps) => {
  return <>
    <Grid container sx={{ pt: 3, px: { sm: 6, md: 4 } }} spacing={3}>
      <Grid item xs={12} md={4} lg={3}>
        {detailsColumn}
      </Grid>
      <Grid item xs={12} md={8} lg={6}>
        {postsList}
      </Grid>
      <Grid item xs={0} lg={3}>
        {sideColumn}
      </Grid>
    </Grid>
  </>
}

export default ProfileLayout;