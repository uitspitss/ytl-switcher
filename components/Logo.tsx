import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const Logo = () => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h6">YTL Switcher</Typography>
    </Toolbar>
  </AppBar>
);

export default Logo;
