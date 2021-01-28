import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { Modal } from "../../context/Modal";
import DeleteConfirmation from "./DeleteConfirmation";
import FormDiv from '../Parts/Forms/FormDiv';
import DrinkReview from '../DrinkReview';
import DrinkReviewForm from '../DrinkReviewForm';
import { getDrinks, updateDrink } from "../../store/drinks";

const DrinkDetails = () => {
  const dispatch = useDispatch();
  const { drinkId } = useParams();
  const drink = useSelector((state) => state.drinks[drinkId]);
  const user = useSelector((state) => state.session.user);

  const [name, setName] = useState(drink ? drink.name : '');
  const [description, setDescription] = useState(drink ? drink.description : '');
  const [image, setImage] = useState(null);

  const [isLoaded, setIsLoaded] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    dispatch(getDrinks());
  }, [dispatch]);

  useEffect(() => {
    if (drink) {
      setName(drink.name);
      setDescription(drink.description);
    }

    if (drink && user) setIsLoaded(true);
  }, [drink, user]);

  const editClickHandler = () => {
    setEditMode((prev) => !prev);
  };

  const submitClickHandler = async (e) => {
    e.preventDefault();
    setEditMode(false);
    setIsLoaded(false);
    await dispatch(updateDrink({ id: drinkId, name, description, image }));
    dispatch(getDrinks());
  };

  const deleteClickHandler = () => {
    setShowDeleteModal(true);
  };

  const updateFile = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  if (!isLoaded) return null;

  if (editMode) {
    return (
      <>
        <div className="tw-grid-cols-3 tw-grid tw-p-8 tw-flex tw-flex-col tw-items-center">
          <div className="tw-flex tw-justify-center tw-col-span-1 tw-p-4 tw-max-h-96">
            <img src={drink.imageUrl} alt={drink.name} />
          </div>
          <div className="tw-col-span-2 tw-p-4 tw-flex tw-flex-col">
            <h1 className="tw-font-serif tw-text-xl tw-font-semibold">Drink No. {drink.id} Details</h1>
            <form onSubmit={submitClickHandler}>
              <FormDiv required={true} type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Drink Name" />
              <FormDiv required={true} type="textarea" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Drink Description" />
              <input type="file" onChange={updateFile} />
              <button className="tw-p-1 tw-m-1 tw-border hover:tw-bg-gray-300" type="submit">
                Submit
              </button>
            </form>
            <div className="tw-w-2/4 tw-flex tw-flex-start">
              <button className="tw-p-1 tw-m-1 tw-border hover:tw-bg-gray-300" onClick={editClickHandler}>
                Cancel Edit
              </button>
              <button className="tw-p-1 tw-m-1 tw-border hover:tw-bg-gray-300" onClick={deleteClickHandler}>
                Delete
              </button>
            </div>
          </div>
        </div>
        {user && user.id !== drink.creatorId && <DrinkReviewForm userId={user.id} drinkId={drink.id} />}
        {drink && drink.Reviews.map(review => <DrinkReview key={review.id} reviewObj={review} userId={user.id} drinkId={drink.id} />)}
        {showDeleteModal && (
          <Modal onClose={() => setShowDeleteModal(false)}>
            <DeleteConfirmation setShowDeleteModal={setShowDeleteModal} id={drink.id} />
          </Modal>
        )}
      </>
    );
  }

  return (
    <>
      <div className="tw-grid-cols-3 tw-grid tw-p-8 tw-flex tw-flex-col tw-items-center lg:tw-w-2/4 lg:tw-m-auto">
        <div className="tw-flex tw-justify-center tw-col-span-1 tw-p-4 tw-max-h-96">
          <img src={drink.imageUrl} alt={drink.name} className="tw-object-fill tw-max-w-60" />
        </div>
        <div className="tw-col-span-2 tw-p-4 tw-flex tw-flex-col">
          <h1 className="tw-font-serif tw-text-xl tw-font-semibold">Drink No. {drink.id} Details</h1>
          <h3 className="tw-text-l tw-font-bold">The {drink.name} - created by {drink.Creator.username}</h3>
          <p>{drink.description}</p>
          {user && drink.creatorId === user.id && (
            <div className="tw-w-2/4 tw-flex tw-flex-start">
              <button className="tw-p-1 tw-m-1 tw-border hover:tw-bg-gray-300" onClick={editClickHandler}>
                Edit
              </button>
              <button className="tw-p-1 tw-m-1 tw-border hover:tw-bg-gray-300" onClick={deleteClickHandler}>
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
      {user && user.id !== drink.creatorId && <DrinkReviewForm userId={user.id} drinkId={drink.id} />}
      <div className="tw-p-2">
        <h2 className="tw-text-center tw-text-2xl tw-font-serif">Reviews</h2>
        {drink && drink.Reviews && drink.Reviews.map(review => <DrinkReview userId={user.id} drinkId={drink.id} key={review.id} reviewObj={review} />)}
      </div>
      {showDeleteModal && (
        <Modal onClose={() => setShowDeleteModal(false)}>
          <DeleteConfirmation setShowDeleteModal={setShowDeleteModal} id={drink.id} />
        </Modal>
      )}
    </>
  );
};

export default DrinkDetails;
