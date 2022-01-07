import { useState } from "react";

import { Modal } from "../../context/Modal";
import DeleteConfirmation from "./DeleteConfirmation";

const DeleteConfirmationModal = (props) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  if (!showDeleteModal) return null;

  return (
    <Modal onClose={() => setShowDeleteModal(false)}>
      <DeleteConfirmation setShowDeleteModal={setShowDeleteModal} {...props} />
    </Modal>
  );
};

export default DeleteConfirmationModal;
