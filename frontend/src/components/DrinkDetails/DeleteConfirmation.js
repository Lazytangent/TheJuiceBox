import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import styles from './DeleteConfirmation.module.css';
import { deleteDrink } from '../../store/drinks';

const DeleteConfirmation = ({ id, setShowDeleteModal }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const onClick = () => {
    dispatch(deleteDrink(id))
    history.push('/drinks');
  };

  const closeModal = () => {
    setShowDeleteModal(false);
  };

  return (
    <div className={styles.deleteConfirmationModal}>
      <h2>Are you sure you want to delete this drink?</h2>
      <div className={styles.buttonDiv}>
        <button className={styles.yesBtn} onClick={onClick}>Yes</button>
        <button className={styles.noBtn} onClick={closeModal}>No</button>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
