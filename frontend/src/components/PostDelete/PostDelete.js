import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const PostDelete = () => {
  const history = useHistory();

  useEffect(() => {
    const timeout = setTimeout(() => {
      history.push('/drinks');
    }, 2500);
    return () => clearTimeout(timeout);
  }, [history]);

  return (
    <>
      <h1>Deleted!</h1>
      <h2>Redirecting you back to the other drinks...</h2>
    </>
  )
};

export default PostDelete;
