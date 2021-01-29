const SubmitBtn = ({ name, color }) => {
  return (
    <div className="tw-p-1.5 tw-flex tw-items-center tw-justify-center">
      <button className={`tw-max-h-16 tw-border-2 tw-border-black tw-p-1 tw-rounded tw-bg-${color ? color : 'cyan'} hover:tw-bg-${color ? color : 'cyan'}-dark tw-text-xl`} type="submit">{ name }</button>
    </div>
  );
};

export default SubmitBtn;
