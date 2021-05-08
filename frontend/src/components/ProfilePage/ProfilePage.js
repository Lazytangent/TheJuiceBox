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
  const drinks = useSelector((state) => Object.values(state.drinks));
  const reviews = useSelector((state) => Object.values(state.drinkReviews));

  useEffect(() => {
    dispatch(getUser(userId));
  }, [dispatch, userId]);

  if (!user) return null;

  return (
    <div>
      <div className="tw-min-h-screen tw-mx-auto">
        <h1 className="tw-text-white tw-text-4xl tw-p-4 tw-font-semibold tw-text-center">{user.username}</h1>
        {drinks.length > 0 && (
          <>
            <hr className="tw-border-white" />
            <h3 className="tw-text-xl tw-text-white tw-text-center tw-p-2">Drinks by {user.username}</h3>
            <ul>
              {drinks.map((drink) => (
                <div className="tw-flex tw-justify-center tw-p-4" key={drink.id}>
                  <Drink drink={drink} />
                </div>
              ))}
            </ul>
          </>
        )}
        {reviews.length > 0 && (
          <>
            <hr className="tw-border-white" />
            <h3 className="tw-text-xl tw-text-white tw-text-center tw-p-2">{user.username}'s Reviews of Drinks</h3>
            <ul>
              {reviews.map((review) => (
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
