import { useState } from 'react';

import { Modal } from '../../context/Modal';
import DrinkForm from './DrinkForm';

const DrinkFormModal = () => {
  const [showDrinkForm, setShowDrinkForm] = useState(false);

  return (
    <>
      <button className="hover:tw-bg-blue tw-rounded-md tw-p-1" onClick={() => setShowDrinkForm(true)}>New Drink</button>
      {showDrinkForm && (
        <Modal onClose={() => setShowDrinkForm(false)}>
          <DrinkForm setShowDrinkForm={setShowDrinkForm} />
        </Modal>
      )}
    </>
  );
};

export default DrinkFormModal;
