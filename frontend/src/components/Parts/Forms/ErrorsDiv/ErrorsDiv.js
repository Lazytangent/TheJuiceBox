const ErrorsDiv = ({ errors }) => {
  const capitalizeFirstLetter = (string) => {
    return string[0].toUpperCase() + string.slice(1);
  };

  return (
    <>
      {errors.length > 0 && (
        <ul className="tw-text-red-dark tw-text-center tw-py-2 tw-px-8">
          {errors.map((error, idx) => (
            <li key={idx}>{capitalizeFirstLetter(error)}</li>
          ))}
        </ul>
      )}
    </>
  );
};

export default ErrorsDiv;
