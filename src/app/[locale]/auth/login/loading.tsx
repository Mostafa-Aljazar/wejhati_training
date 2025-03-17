import { Loader } from '@mantine/core';
import React from 'react';

type Props = {};

const PageLoader = (props: Props) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader />
    </div>
  );
};

export default PageLoader;
