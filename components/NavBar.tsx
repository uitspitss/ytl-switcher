import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import styled from '@emotion/styled';
import AdditionForm from './AdditionForm';

const StyledTitle = styled(Typography)`
  flex-grow: 1;
`;

const Logo = () => (
  <AppBar position="static">
    <Toolbar>
      <StyledTitle variant="h6">
        YouTube Live Switcher (YTL Switcher)
      </StyledTitle>
      <AdditionForm />
    </Toolbar>
  </AppBar>
);

export default Logo;
