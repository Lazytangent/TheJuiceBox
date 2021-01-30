import { Modal } from '../../context/Modal';
import DrinkForm from './DrinkForm';

const DrinkFormModal = ({ showDrinkForm, setShowDrinkForm }) => {
  return (
    <>
      <button className="hover:tw-bg-blue tw-rounded-md tw-p-1" onClick={() => setShowDrinkForm(true)}>New Drink</button>
      {showDrinkForm && (
        <Modal onClose={() => setShowDrinkForm(false)}>
          <DrinkForm />
        </Modal>
      )}
    </>
  );
};

export default DrinkFormModal;
