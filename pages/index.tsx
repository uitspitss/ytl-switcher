import React from 'react';
import { NextPage } from 'next';
import styled from '@emotion/styled';
import NavBar from '../components/NavBar';
import VideoGrid from '../components/VideoGrid';
import AdditionButton from '../components/AdditionButton';
import { StoreProvider } from '../store';

const StyledDiv = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
`;

const IndexPage: NextPage = () => {
  return (
    <StoreProvider>
      <StyledDiv>
        <NavBar />
        <VideoGrid />
        <AdditionButton floating />
      </StyledDiv>
    </StoreProvider>
  );
};

export default IndexPage;
