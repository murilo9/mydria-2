import { Container, Toolbar } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router';
import TopBar from '../TopBar';

export default function AppLayout() {
  return <>
    <TopBar />
    <Toolbar />
    <Container maxWidth="lg">
      <Outlet />
    </Container>
  </>
}