import { Box, Divider } from '@mui/material';
import React from 'react';

type LayoutDividerProps = {
  sx?: { [key: string]: any }
}

export default function LayoutDivider({ sx }: LayoutDividerProps) {
  return <>
    <Box sx={{ my: 0, ...sx }}>
      <Divider />
      <Divider sx={{ mt: 1 }} />
    </Box>
  </>
}