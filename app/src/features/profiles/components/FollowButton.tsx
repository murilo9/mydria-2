import { Button } from '@mui/material';
import React from 'react';

type FollowButtonProps = {
  following: boolean,
  onClick?: Function,
  sx?: { [key: string]: any }
}

export default function FollowButton({ following, sx }: FollowButtonProps) {
  return <>
    <Button
      sx={{ width: { xs: 'auto', md: 1 }, ...sx }}
      disableElevation
      variant={following ? "contained" : "outlined"}
      color={following ? "info" : "primary"}
    >
      {following ? "Following" : "Follow"}
    </Button>
  </>
}