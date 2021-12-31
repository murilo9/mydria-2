import { Button } from '@mui/material';
import React from 'react';

type FollowButtonProps = {
  following: boolean,
  onClick?: Function
}

export default function FollowButton({ following }: FollowButtonProps) {
  return <>
    <Button
      sx={{ width: { xs: 'auto', md: 1 } }}
      disableElevation
      variant={following ? "contained" : "text"}
      color={following ? "info" : "primary"}
    >
      {following ? "Following" : "Follow"}
    </Button>
  </>
}