import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { session } from '../../../store/selectors';
import { useSearchContext } from '../../../context/SearchContext';

const SearchBar = () => {
  const history = useHistory();

  const sessionUser = useSelector(session.user());
  const { input, setInput } = useSearchContext();

  const onSearch = (e) => {
    e.preventDefault();
    history.push(`/search?thing1=${input}`)
  };

  if (!sessionUser) return null;

  return (
    <div className="tw-flex tw-items-center tw-px-4">
      <form onSubmit={onSearch}>
        <input type="search" value={input} onChange={e => setInput(e.target.value)} placeholder="Search..." className="tw-p-2 tw-rounded md:tw-w-72"/>
      </form>
    </div>
  );
};

export default SearchBar;
