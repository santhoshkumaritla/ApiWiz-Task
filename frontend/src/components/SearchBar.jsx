import { useState } from 'react';
import { findNodeByPath } from '../utils/jsonParser';

const SearchBar = ({ nodes, onNodeFound, onSearchClear }) => {
  const [searchPath, setSearchPath] = useState('');
  const [searchStatus, setSearchStatus] = useState(null);

  const handleSearch = () => {
    if (!searchPath.trim()) {
      setSearchStatus(null);
      return;
    }

    const foundNode = findNodeByPath(nodes, searchPath);
    
    if (foundNode) {
      setSearchStatus('found');
      onNodeFound(foundNode);
    } else {
      setSearchStatus('not-found');
    }
  };

  const handleClear = () => {
    setSearchPath('');
    setSearchStatus(null);
    onSearchClear();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <input
            type="text"
            value={searchPath}
            onChange={(e) => {
              setSearchPath(e.target.value);
              setSearchStatus(null);
            }}
            onKeyPress={handleKeyPress}
            placeholder="Search by path (e.g., $.user.address.city or $.items[0].name)"
            className="
              w-full px-4 py-2.5 
              bg-white dark:bg-gray-800
              text-gray-900 dark:text-gray-100
              border-2 border-gray-300 dark:border-gray-600
              rounded-lg
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
              placeholder:text-gray-400 dark:placeholder:text-gray-500
              text-sm
            "
          />
          {searchPath && (
            <button
              onClick={handleClear}
              className="
                absolute right-2 top-1/2 -translate-y-1/2
                p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded
                transition-colors
              "
              title="Clear search"
            >
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
        
        <button
          onClick={handleSearch}
          disabled={!searchPath.trim()}
          className="
            px-6 py-2.5
            bg-indigo-500 hover:bg-indigo-600
            disabled:bg-gray-400 dark:disabled:bg-gray-600
            text-white font-medium rounded-lg
            transition-colors duration-200
            disabled:cursor-not-allowed
            shadow-md hover:shadow-lg
            text-sm
          "
        >
          🔍 Search
        </button>
      </div>

      {searchStatus === 'found' && (
        <div className="px-4 py-2 bg-green-50 dark:bg-green-900/20 border border-green-300 dark:border-green-800 rounded-lg animate-fade-in">
          <p className="text-sm text-green-700 dark:text-green-400 font-medium">
            ✅ Match found! Node highlighted and centered.
          </p>
        </div>
      )}

      {searchStatus === 'not-found' && (
        <div className="px-4 py-2 bg-orange-50 dark:bg-orange-900/20 border border-orange-300 dark:border-orange-800 rounded-lg animate-fade-in">
          <p className="text-sm text-orange-700 dark:text-orange-400 font-medium">
            ⚠️ No match found for path: <code className="font-mono">{searchPath}</code>
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
