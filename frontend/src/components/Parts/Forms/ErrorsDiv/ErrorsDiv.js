const ErrorsDiv = ({ errors }) => {
  return (
    <>
      {errors.length > 0 && (
      <ul className="tw-text-red-500 tw-text-center tw-py-2 tw-px-8">
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      )
      }
    </>
  );
};

export default ErrorsDiv;
