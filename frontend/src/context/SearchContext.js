import { createContext, useState, useContext } from 'react';

const SearchContext = createContext();

export const useSearchContext = () => useContext(SearchContext);

export default function SearchProvider({ children }) {
  const [input, setInput] = useState('');

  return (
    <SearchContext.Provider value={{ input, setInput }}>
      { children }
    </SearchContext.Provider>
  );
}
