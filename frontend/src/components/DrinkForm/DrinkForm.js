import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import FormDiv from '../Parts/Forms/FormDiv';
import ErrorsDiv from '../Parts/Forms/ErrorsDiv';
import SubmitBtn from '../Parts/Forms/SubmitBtn';
import { mixDrink } from '../../store/drinks';

const DrinkForm = ({ setShowDrinkForm }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState([]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setShowDrinkForm(false);
    const response = await dispatch(mixDrink({ name, description, image }));
    if (response.data && response.data.errors) setErrors(response.data.errors);
    else history.push(`/drinks/${response.data.drink.id}`);
  };

  const updateFile = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  }

  return (
    <div className="tw-bg-gray tw-flex tw-justify-start tw-rounded tw-flex-col tw-items-center">
      <form className="tw-bg-gray-light tw-p-4 tw-rounded" onSubmit={onSubmit}>
        <h1 className="tw-text-3xl tw-text-center tw-font-serif tw-font-semibold">Drink Form</h1>
        <ErrorsDiv errors={errors} />
        <FormDiv labelName="Drink Name:" col={true} required={true} type="text" value={name} onChange={e => setName(e.target.value)} />
        <FormDiv labelName="Description:" col={true} required={true} type="textarea" value={description} onChange={e => setDescription(e.target.value)} />
        <div className="tw-p-4 tw-m-2 tw-flex tw-w-auto tw-justify-between">
          <div className="tw-p-1 tw-m-2 tw-flex tw-flex-col tw-justify-center">
            <label className="tw-p-1.5 tw-flex tw-items-center">
              Image:
            </label>
            <input type="file" onChange={updateFile} />
          </div>
          <SubmitBtn name="Mix Drink" color="purple" />
        </div>
      </form>
    </div>
  );
};

export default DrinkForm;
