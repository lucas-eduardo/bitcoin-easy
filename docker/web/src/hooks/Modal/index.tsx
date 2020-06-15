import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useMemo,
  useEffect,
  useCallback,
} from 'react';

import { Wrapper } from './styles';

interface ModalContextData {
  setContent: (status: React.ReactNode) => void;
  closeModal: () => void;
  isOpenModal: boolean;
}

const ModalContext = createContext<ModalContextData>({} as ModalContextData);

const ModalProvider: React.FC = ({ children }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [content, setContent] = useState<React.ReactNode | null>(null);
  const [enableAnimationModal, setEnableAnimationModal] = useState(false);
  const [animation, setAnimation] = useState('out');

  const modal = useMemo(() => {
    return (
      enableAnimationModal && (
        <Wrapper ref={modalRef} id="modal" className={`fade-${animation}`}>
          {content}
        </Wrapper>
      )
    );
  }, [animation, content, enableAnimationModal]);

  const closeModal = useCallback(() => {
    setContent(null);
  }, []);

  useEffect(() => {
    const body = document.getElementsByTagName('body').item(0);

    if (content) {
      setEnableAnimationModal(true);
      if (body) {
        body.style.overflow = 'hidden';
      }

      setTimeout(() => {
        setAnimation('in');
        if (modalRef.current) {
          modalRef.current.addEventListener('click', (event: MouseEvent) => {
            if (event.target) {
              const { id } = event.target as HTMLDivElement;

              if (id === 'modal') {
                setContent(null);
              }
            }
          });
        }
      }, 100);
    } else {
      setAnimation('out');
      if (modalRef.current) {
        modalRef.current.removeEventListener('click', () => false);
      }
      setTimeout(() => {
        setEnableAnimationModal(false);
        if (body) {
          body.style.overflow = 'hidden';
        }
      }, 510);
    }
  }, [content]);

  return (
    <ModalContext.Provider
      value={{ setContent, isOpenModal: !!content, closeModal }}
    >
      {children}
      {modal}
    </ModalContext.Provider>
  );
};

function useModal(): ModalContextData {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error('useModal must be used within an ModalProvider');
  }

  return context;
}

export { ModalProvider, useModal };
