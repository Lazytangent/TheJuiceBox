import { useState } from "react";
import { useDispatch } from "react-redux";

import { Modal } from '../../context/Modal';
import ErrorsDiv from '../Parts/Forms/ErrorsDiv';
import DeleteConfirmation from './DeleteConfirmation';
import FormDiv from "../Parts/Forms/FormDiv";
import { updateDrink, getDrinks } from "../../store/drinks";

const EditModal = ({ showDeleteModal, setShowDeleteModal, setIsLoaded, drink, user, setEditMode }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState(drink.name ?? "");
  const [description, setDescription] = useState(drink.description || "");
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState([]);

  const editClickHandler = () => {
    setEditMode((prev) => !prev);
  };

  const submitClickHandler = async (e) => {
    e.preventDefault();
    setEditMode(false);
    setIsLoaded(false);
    const response = await dispatch(updateDrink({ id: drink.id, name, description, image }));
    if (response.data && response.data.errors) setErrors(response.data.errors);
    else dispatch(getDrinks());
  };

  const deleteClickHandler = () => {
    setShowDeleteModal(true);
  };

  const updateFile = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  return (
    <>
      <div className="tw-bg-gray tw-grid-cols-3 tw-grid tw-p-8 tw-max-w-7xl tw-flex tw-flex-col tw-items-center">
        <div className="tw-flex tw-justify-center tw-col-span-1 tw-p-4 tw-max-h-96">
          <img src={drink.imageUrl} alt={drink.name} />
        </div>
        <div className="tw-col-span-2 tw-p-4 tw-flex tw-flex-col">
          <h1 className="tw-text-xl tw-font-semibold">Drink No. {drink.id} Details</h1>
          <form onSubmit={submitClickHandler}>
            <ErrorsDiv errors={errors} />
            <FormDiv required={true} type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Drink Name" />
            <FormDiv required={true} type="textarea" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Drink Description" />
            <input type="file" className="tw-p-1" onChange={updateFile} />
            <button className="tw-p-1 tw-m-1 tw-border-2 tw-bg-green tw-rounded hover:tw-bg-green-dark" type="submit">
              Submit
            </button>
          </form>
          <div className="tw-w-2/4 tw-flex tw-flex-start">
            <button className="tw-p-1 tw-m-1 tw-border-2 tw-rounded tw-bg-yellow hover:tw-bg-yellow-dark" onClick={editClickHandler}>
              Cancel Edit
            </button>
            <button className="tw-p-1 tw-m-1 tw-border-2 tw-bg-red hover:tw-bg-red-dark tw-rounded" onClick={deleteClickHandler}>
              Delete
            </button>
          </div>
        </div>
      </div>
      {showDeleteModal && (
        <Modal onClose={() => setShowDeleteModal(false)}>
          <DeleteConfirmation setShowDeleteModal={setShowDeleteModal} id={drink.id} />
        </Modal>
      )}
    </>
  );
};

export default EditModal;
