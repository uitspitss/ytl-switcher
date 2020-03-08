import React from 'react';
import { NextPage } from 'next';
import Logo from '../components/Logo';
import VideoGrid from '../components/VideoGrid';
import { StoreProvider } from '../store';

const IndexPage: NextPage = () => {
  return (
    <StoreProvider>
      <Logo />
      <VideoGrid />
    </StoreProvider>
  );
};

export default IndexPage;
