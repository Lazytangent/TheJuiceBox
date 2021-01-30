import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";

import { getUser } from "../../store/users";
import Drink from '../Drinks/Drink';
import DrinkReview from '../DrinkReview';

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
    <div>
      <div className="tw-max-w-7xl tw-mx-auto tw-min-h-screen">
        <h1 className="tw-text-white tw-text-4xl tw-p-4 tw-font-serif tw-font-semibold tw-text-center">{profile.username}</h1>
        {profile.Drinks.length > 0 && (
          <>
            <hr className="tw-border-white" />
            <h3 className="tw-text-xl tw-text-white tw-text-center tw-p-2">Drinks by {profile.username}</h3>
            <ul>
              {profile.Drinks.map((drink) => (
                <div className="tw-flex tw-justify-center tw-p-4" key={drink.id}>
                  <Drink drink={drink} />
                </div>
              ))}
            </ul>
          </>
        )}
        {profile.DrinkReviews.length > 0 && (
          <>
            <hr className="tw-border-white" />
            <h3 className="tw-text-xl tw-text-white tw-text-center tw-p-2">{profile.username}'s Reviews of Drinks</h3>
            <ul>
              {profile.DrinkReviews.map((review) => (
                <Link key={review.id} to={`/drinks/${review.drinkId}`}>
                  <DrinkReview userId={userId} drinkId={review.drinkId} key={review.id} reviewObj={review} />
                </Link>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
