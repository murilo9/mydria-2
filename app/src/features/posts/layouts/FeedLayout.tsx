import { Grid } from '@mui/material';
import React, { ReactElement } from 'react';

type FeedLayoutProps = {
  postsList: ReactElement,
  sideColumn: ReactElement
}

const FeedLayout: React.FC<FeedLayoutProps> = ({ postsList, sideColumn }: FeedLayoutProps) => {
  return <>
    <Grid container sx={{ pt: 3, px: { sm: 5, md: 4 } }} spacing={3}>
      <Grid item xs={12} md={8}>
        {postsList}
      </Grid>
      <Grid item xs={0} md={4}>
        {sideColumn}
      </Grid>
    </Grid>
  </>
}

export default FeedLayout;