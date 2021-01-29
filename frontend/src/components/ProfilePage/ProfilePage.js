import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { getUser } from "../../store/users";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();

  const [profile, setProfile] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(getUser(userId))
      .then((res) => setProfile(res.data.user))
      .then(() => setIsLoaded(true))
      .catch((err) => console.error(err));
  }, [dispatch, userId]);

  if (!isLoaded) return null;

  return (
    <div className="tw-h-screen">
      <div className="tw-bg-gray tw-max-w-7xl tw-mx-auto">
        <h1 className="tw-text-xl tw-font-serif tw-font-semibold">{profile.username}</h1>
        {profile.Drinks.length > 0 && (
          <>
            <h3>Drinks by {profile.username}</h3>
            <ul>
              {profile.Drinks.map((drink) => (
                <li key={drink.id}>{drink.name}</li>
              ))}
            </ul>
          </>
        )}
        {profile.DrinkReviews.length > 0 && (
          <>
            <h3>{profile.username}'s Reviews of Drinks</h3>
            <ul>
              {profile.DrinkReviews.map((review) => (
                <li key={review.id}>{review.review}</li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
