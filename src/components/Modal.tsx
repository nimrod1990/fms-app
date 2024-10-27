// src/components/Modal.tsx

import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // 处理 ESC 键关闭模态
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      // 聚焦模态框
      modalRef.current?.focus();
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      className="modal-overlay"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
      data-testid="modal-overlay"
    >
      <div
        className="modal-content"
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
        data-testid="modal-content"
        tabIndex={-1}
        ref={modalRef}
      >
        <button
          className="modal-close-button"
          onClick={onClose}
          aria-label="关闭模态"
          data-testid="modal-close-button"
        >
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
