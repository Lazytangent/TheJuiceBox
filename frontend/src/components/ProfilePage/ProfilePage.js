import { useParams } from 'react-router-dom';

const ProfilePage = () => {
  const { userId } = useParams();

  return (
    <div className="tw-h-screen">
      <h1>Placeholder for Profile Page</h1>
    </div>
  );
};

export default ProfilePage;
