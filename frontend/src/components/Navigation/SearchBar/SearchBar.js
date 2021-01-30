import { useHistory } from 'react-router-dom';

import { useSearchContext } from '../../../context/SearchContext';

const SearchBar = () => {
  const history = useHistory();

  const { input, setInput } = useSearchContext();

  const onSearch = (e) => {
    e.preventDefault();
    history.push(`/search?thing1=${input}`)
  };

  return (
    <div className="tw-flex tw-items-center tw-px-4">
      <form onSubmit={onSearch}>
        <input type="search" value={input} onChange={e => setInput(e.target.value)} placeholder="Search..." className="tw-p-2 tw-rounded tw-w-72"/>
      </form>
    </div>
  );
};

export default SearchBar;
