import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getUser } from '../../store/users';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();

  const [profile, setProfile] = useState(null);

  useEffect(() => {
    dispatch(getUser(userId))
      .then((res) => setProfile(res.data.user))
      .then((res) => console.log(res.data.user))
      .catch((err) => console.error(err));
  }, [dispatch, userId]);

  console.log(profile);

  return (
    <div className="tw-h-screen">
      <h1>Placeholder for Profile Page</h1>
    </div>
  );
};

export default ProfilePage;
