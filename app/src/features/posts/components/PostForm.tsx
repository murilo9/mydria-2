import { PhotoCamera } from '@mui/icons-material';
import { Box, Button, Card, CardContent, Divider, Grid, IconButton, TextField } from '@mui/material';
import React from 'react';
import TagBox from './TagBox';

export default function PostForm() {
  return <>
    <Box sx={{ mb: 2 }}>
      <TextField multiline rows={3} sx={{ mb: 1 }} fullWidth placeholder="Tell people something, Murilo" />
      <TagBox tags={['HashTags', 'CoolStuff']} />
      <TextField sx={{ mb: 2 }} placeholder="Tags" fullWidth />

      <Grid container justifyContent="end" spacing={2}>
        <Grid item sx={{ display: 'flex', justifyContent: 'end' }}>
          <IconButton color="primary" aria-label="upload picture">
            <PhotoCamera />
          </IconButton>
        </Grid>
        <Grid item xs={4} sm={3}>
          <Button variant="contained" disableElevation fullWidth>Publish</Button>
        </Grid>
      </Grid>
    </Box>
  </>
}