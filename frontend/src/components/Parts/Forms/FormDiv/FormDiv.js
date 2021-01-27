const FormDiv = ({ labelName, required, type, value, onChange }) => {
  if (type === 'textarea') {
    return (
      <div className="tw-p-4 tw-m-2 tw-flex tw-justify-between">
        <label className="tw-p-1.5 tw-flex tw-items-center">
          { labelName }
        </label>
        <textarea required={required} className="tw-p-1.5 tw-ml-1.5 tw-border tw-rounded" value={value} onChange={onChange}></textarea>
      </div>
    );
  } else {
    return (
      <div className="tw-p-4 tw-m-2 tw-flex tw-justify-between">
        <label className="tw-p-1.5 tw-flex tw-items-center">
          { labelName }
        </label>
        <input required={required} className="tw-p-1.5 tw-ml-1.5 tw-border tw-rounded" type={type} value={value} onChange={onChange} />
      </div>
    );
  }
};

export default FormDiv;
