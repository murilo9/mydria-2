import { Forum } from '@mui/icons-material';
import { Button } from '@mui/material';
import React from 'react';

type CommentsButtonProps = {
  amount: number,
  onClick?: Function,
  sx?: { [key: string]: any }
}

const buttonColor = '#AAAAAA'

export default function CommentsButton({ amount, sx, onClick = () => { } }: CommentsButtonProps) {
  const handleButtonClick = (ev: any) => {
    onClick()
  }

  return <>
    <Button
      variant="outlined"
      size="small"
      color="info"
      disableElevation
      sx={{ borderRadius: 2, borderColor: buttonColor, color: buttonColor, ...sx }}
      startIcon={<Forum sx={{ opacity: 0.5 }} fontSize="small" />}
      onClick={handleButtonClick}
    >
      {amount}
    </Button>
  </>
}