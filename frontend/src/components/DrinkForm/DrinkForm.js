import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import FormDiv from '../Parts/Forms/FormDiv';
import ErrorsDiv from '../Parts/Forms/ErrorsDiv';
import SubmitBtn from '../Parts/Forms/SubmitBtn';
import { mixDrink } from '../../store/drinks';

const DrinkForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState([]);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const drink = await dispatch(mixDrink({ name, description, image }));
      history.push(`/drinks/${drink.id}`);
    } catch (err) {
      setErrors([]);
      console.log(err);
      setErrors((prev) => [...prev, err.msg]);
    }
  };

  const updateFile = (e) => {
    const file = e.target.files[0];
    console.log(file);
    if (file) setImage(file);
  }

  return (
    <div className="tw-flex tw-justify-center tw-flex-col tw-items-center">
      <form className="lg:tw-w-2/4" onSubmit={onSubmit}>
        <h1 className="tw-text-3xl tw-text-center">Drink Form</h1>
        <ErrorsDiv errors={errors} />
        <FormDiv labelName="Drink Name:" required={true} type="text" value={name} onChange={e => setName(e.target.value)} />
        <FormDiv labelName="Description:" required={true} type="textarea" value={description} onChange={e => setDescription(e.target.value)} />
        <div className="tw-p-4 tw-m-2 tw-flex tw-justify-between">
          <label className="tw-p-1.5 tw-flex tw-items-center">
            Image:
          </label>
          <input type="file" onChange={updateFile} />
        </div>
        <SubmitBtn name="Mix Drink" />
      </form>
    </div>
  );
};

export default DrinkForm;
