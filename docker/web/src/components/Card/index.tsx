import React from 'react';

import { Wrapper, Header, Footer } from './styles';

interface Props {
  header?: React.ReactNode | null;
  footer?: React.ReactNode | null;
  colorBackground?: string;
  colorBoxShadow?: string;
  colorLine?: string;
}

const Card: React.FC<Props> = ({
  header,
  children,
  footer,
  colorBackground = '#fff',
  colorBoxShadow = '#242424',
  colorLine = '#f0ae38',
}) => {
  return (
    <Wrapper background={colorBackground} boxShadow={colorBoxShadow}>
      {header && <Header border={colorLine}>{header}</Header>}

      {children}

      {footer && <Footer border={colorLine}>{footer}</Footer>}
    </Wrapper>
  );
};

export default Card;
