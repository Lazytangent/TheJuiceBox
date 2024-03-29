import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { deleteDrink } from "../../store/drinks";

const DeleteConfirmation = ({ id, setShowDeleteModal }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const onClick = () => {
    dispatch(deleteDrink(id));
    history.push("/drinks");
  };

  const closeModal = () => {
    setShowDeleteModal(false);
  };

  return (
    <div className="tw-bg-white tw-p-8 tw-rounded">
      <h2>Are you sure you want to delete this drink?</h2>
      <div className="tw-p-1 tw-flex tw-justify-around">
        <button
          className="tw-p-1 tw-border-2 tw-bg-red hover:tw-bg-red-dark tw-rounded"
          onClick={onClick}
        >
          Yes
        </button>
        <button
          className="tw-p-1 tw-border-2 tw-bg-blue hover:tw-bg-blue-dark tw-rounded"
          onClick={closeModal}
        >
          No
        </button>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
