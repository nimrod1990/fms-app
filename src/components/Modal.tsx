// src/components/Modal.tsx
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  // 处理 ESC 键关闭模态
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose} aria-modal="true" role="dialog">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-button" onClick={onClose} aria-label="关闭模态">
          &times;
        </button>
        <h3>{title}</h3>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
