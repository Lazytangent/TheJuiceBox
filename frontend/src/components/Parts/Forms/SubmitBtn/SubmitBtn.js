const SubmitBtn = ({ name }) => {
  return (
    <div className="tw-p-1.5 tw-flex tw-justify-center">
      <button className="tw-border-2 tw-border-black tw-p-1 tw-rounded tw-bg-cyan hover:tw-bg-cyan-dark tw-text-xl" type="submit">{ name }</button>
    </div>
  );
};

export default SubmitBtn;
