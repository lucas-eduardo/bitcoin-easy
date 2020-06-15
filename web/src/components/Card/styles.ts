import styled from 'styled-components';

interface WrapperProps {
  background: string;
  boxShadow: string;
}

interface HeaderProps {
  border: string;
}

interface FooterProps {
  border: string;
}

export const Wrapper = styled.div<WrapperProps>`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: ${({ background }) => background};
  padding: 2rem;
  box-shadow: 1px 3px 4px -0.6px ${({ boxShadow }) => boxShadow};
  border-radius: 4px;
`;

export const Header = styled.header<HeaderProps>`
  display: flex;
  align-items: center;
  padding-bottom: 1rem;
  margin-bottom: 2rem;
  border-bottom: 2px solid ${({ border }) => border};
`;

export const Footer = styled.footer<FooterProps>`
  margin-top: 2rem;
  border-top: 2px solid ${({ border }) => border};
  bottom: 2rem;
  padding-top: 1rem;
`;
