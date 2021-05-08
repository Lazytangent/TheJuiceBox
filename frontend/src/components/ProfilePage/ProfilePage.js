import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";

import { getUser } from "../../store/users";
import Drink from '../Drinks/Drink';
import DrinkReview from '../DrinkReview';

const ProfilePage = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users[userId]);

  useEffect(() => {
    dispatch(getUser(userId));
  }, [dispatch, userId]);

  if (!user) return null;

  return (
    <div>
      <div className="tw-min-h-screen tw-mx-auto">
        <h1 className="tw-text-white tw-text-4xl tw-p-4 tw-font-semibold tw-text-center">{user.username}</h1>
        {user.Drinks.length > 0 && (
          <>
            <hr className="tw-border-white" />
            <h3 className="tw-text-xl tw-text-white tw-text-center tw-p-2">Drinks by {user.username}</h3>
            <ul>
              {user.Drinks.map((drink) => (
                <div className="tw-flex tw-justify-center tw-p-4" key={drink.id}>
                  <Drink drink={drink} />
                </div>
              ))}
            </ul>
          </>
        )}
        {user.DrinkReviews.length > 0 && (
          <>
            <hr className="tw-border-white" />
            <h3 className="tw-text-xl tw-text-white tw-text-center tw-p-2">{user.username}'s Reviews of Drinks</h3>
            <ul>
              {user.DrinkReviews.map((review) => (
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
