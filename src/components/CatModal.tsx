import React from 'react';
import Modal from './common/Modal';
import CatDetails from './CatDetails';

interface CatModalProps {
  catId: string | null;
  onClose: () => void;
}

const CatModal: React.FC<CatModalProps> = ({ catId, onClose }) => {
  const isOpen = !!catId;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {catId && <CatDetails catId={catId} />}
    </Modal>
  );
};

export default CatModal;
