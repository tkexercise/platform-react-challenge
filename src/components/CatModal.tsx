import React from 'react';
import Modal from './common/Modal';
import CatDetails from './CatDetails';

interface CatModalProps {
  catId: string | null;
  onClose: () => void;
  canBookmark?: boolean;
}

const CatModal: React.FC<CatModalProps> = ({ catId, onClose, canBookmark = true }) => {
  const isOpen = !!catId;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {catId && <CatDetails catId={catId} canBookmark={canBookmark} />}
    </Modal>
  );
};

export default CatModal;
