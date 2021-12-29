import { AppBar, Container, Typography } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router';

export default function AppLayout() {
  return <>
    <h1>App Layout</h1>
    <Outlet />
  </>
}