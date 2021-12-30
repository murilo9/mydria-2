import { ThumbUp } from '@mui/icons-material';
import { Box, Button } from '@mui/material';
import React from 'react';

type LikeButtonProps = {
  amount: number,
  active: boolean,
  onClick?: Function
}

export default function LikeButton({ active, amount }: LikeButtonProps) {
  return <>
    <Button
      variant={active ? "contained" : "outlined"}
      size="small"
      disableElevation
      color="info"
      sx={{ borderRadius: 2 }}
      startIcon={<ThumbUp sx={{ opacity: 0.5 }} fontSize="small" />}
    >
      <Box>{amount}</Box>
    </Button>
  </>
}