import { Modal } from '../../context/Modal';
import DrinkForm from './DrinkForm';

const DrinkFormModal = ({ showDrinkForm, setShowDrinkForm }) => {
  return (
    <>
      <button className="hover:tw-underline hover:tw-cursor-pointer" onClick={() => setShowDrinkForm(true)}>New Drink</button>
      {showDrinkForm && (
        <Modal onClose={() => setShowDrinkForm(false)}>
          <DrinkForm />
        </Modal>
      )}
    </>
  );
};

export default DrinkFormModal;
