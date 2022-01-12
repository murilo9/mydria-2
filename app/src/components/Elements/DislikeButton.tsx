import { ThumbDown } from '@mui/icons-material';
import { Button } from '@mui/material';
import React from 'react';

type LikeButtonProps = {
  amount: number,
  active: boolean,
  onClick?: Function,
  sx?: { [key: string]: any }
}

export default function DisikeButton({ active, amount, sx }: LikeButtonProps) {
  return <>
    <Button
      variant={active ? "contained" : "outlined"}
      size="small"
      color="warning"
      disableElevation
      sx={{ borderRadius: 2, ...sx }}
      startIcon={<ThumbDown sx={{ opacity: 0.5 }} fontSize="small" />}
    >
      {amount}
    </Button>
  </>
}