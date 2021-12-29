import { Add, AddBox, Home, Notifications } from '@mui/icons-material';
import { AppBar, Avatar, Box, Container, IconButton, Toolbar, Typography } from '@mui/material';
import React from 'react';

export default function TopBar() {
  return <>
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography
            variant="h6"
            noWrap
          >
            Murilo Henrique
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: { xs: 'none', sm: 'initial' } }}>
              <Add />
              <Home sx={{ ml: 2 }} />
              <Notifications sx={{ ml: 2 }} />
            </Box>
            <IconButton sx={{ ml: 3 }}>
              <Avatar>M</Avatar>
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  </>
}