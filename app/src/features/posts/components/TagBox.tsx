import { Box, Chip } from '@mui/material';
import React from 'react';

type TagBoxProps = {
  tags: String[],
  handleDelete?: (event: any) => void
};

export default function TagBox({ tags, handleDelete = () => { } }: TagBoxProps) {
  return <>

    <Box sx={{ mb: 2, mt: 1 }}>
      {tags.map(tag => {
        return <Chip
          sx={{ mr: 1 }}
          variant="outlined"
          color="primary"
          label={`#${tag}`}
          onClick={() => { }}
          onDelete={handleDelete}
        />
      })}
    </Box>
  </>
}