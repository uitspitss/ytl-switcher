import React from 'react';
import { NextPage } from 'next';
import NavBar from '../components/NavBar';
import VideoGrid from '../components/VideoGrid';
import { StoreProvider } from '../store';

const IndexPage: NextPage = () => {
  return (
    <StoreProvider>
      <NavBar />
      <VideoGrid />
    </StoreProvider>
  );
};

export default IndexPage;
