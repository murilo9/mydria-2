import { ThumbDown } from '@mui/icons-material';
import { Button } from '@mui/material';
import React from 'react';

type LikeButtonProps = {
  amount: number,
  active: boolean,
  onClick?: Function
}

export default function DisikeButton({ active, amount }: LikeButtonProps) {
  return <>
    <Button
      variant={active ? "contained" : "outlined"}
      size="small"
      color="warning"
      disableElevation
      sx={{ borderRadius: 2 }}
      startIcon={<ThumbDown sx={{ opacity: 0.5 }} fontSize="small" />}
    >
      {amount}
    </Button>
  </>
}