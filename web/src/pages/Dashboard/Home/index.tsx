import React from 'react';

import Counting from './Counting';
import Extract from './Extract';
import Historic from './Historic';
import Position from './Position';

import { Wrapper, ContentCard } from './styles';

const Home: React.FC = () => {
  return (
    <Wrapper>
      <ContentCard>
        <Counting />
        <Extract />

        <Historic />

        <Position />
      </ContentCard>
    </Wrapper>
  );
};

export default Home;
