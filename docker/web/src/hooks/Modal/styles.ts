import styled from 'styled-components';
import { transitions } from 'polished';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: auto;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.85);
  height: 100%;
  padding: 1.4rem;
  opacity: 0;
  transition: opacity linear 0.15s;

  &.fade-in {
    opacity: 1;
    ${transitions('opacity linear 0.5s')};
  }

  &.fade-out {
    opacity: 0;
    ${transitions('opacity linear 0.5s')};
  }
`;
