import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import styled from '@emotion/styled';
import AdditionButton from './AdditionButton';

const StyledTitle = styled(Typography)`
  flex-grow: 1;
`;

const NavBar = () => (
  <AppBar position="static">
    <Toolbar>
      <StyledTitle variant="h6">
        YouTube Live Switcher (YTL Switcher)
      </StyledTitle>
      <AdditionButton />
    </Toolbar>
  </AppBar>
);

export default NavBar;
