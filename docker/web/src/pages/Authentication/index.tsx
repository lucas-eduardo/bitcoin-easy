import React from 'react';

import Router from './routes';

interface Props {
  path: string;
}

const Authentication: React.FC<Props> = ({ path }) => {
  return <Router pathFather={path} />;
};

export default Authentication;
