import { FC, ReactNode } from 'react';
import ReactDOM from 'react-dom';

import classes from './Modal.module.css';

interface BackdropProps {
  onClose: () => void;
}

const Backdrop: FC<BackdropProps> = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose} />;
};

interface ModalOverlayProps {
  children: ReactNode;
}

const ModalOverlay: FC<ModalOverlayProps> = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const portalElement: HTMLElement | null = document.getElementById('overlays');

interface ModalProps {
  onClose: () => void;
  children: ReactNode;
}

const Modal: FC<ModalProps> = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} />,
        portalElement!,
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement!,
      )}
    </>
  );
};

export default Modal;
