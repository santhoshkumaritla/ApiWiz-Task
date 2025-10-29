import { useState } from 'react';
import { validateJson } from '../utils/helpers';

const SAMPLE_JSON = {
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "address": {
      "street": "123 Main St",
      "city": "New York",
      "zipcode": "10001"
    },
    "phones": [
      "+1-555-0100",
      "+1-555-0101"
    ]
  },
  "items": [
    {
      "id": 101,
      "name": "Laptop",
      "price": 999.99,
      "inStock": true
    },
    {
      "id": 102,
      "name": "Mouse",
      "price": 29.99,
      "inStock": false
    }
  ],
  "metadata": {
    "version": "1.0",
    "timestamp": "2025-10-28T12:00:00Z"
  }
};

const JsonInput = ({ onVisualize, onClear }) => {
  const [jsonText, setJsonText] = useState(JSON.stringify(SAMPLE_JSON, null, 2));
  const [error, setError] = useState(null);

  const handleVisualize = () => {
    const validation = validateJson(jsonText);
    
    if (validation.valid) {
      setError(null);
      const parsedData = JSON.parse(jsonText);
      onVisualize(parsedData);
    } else {
      setError(validation.error);
    }
  };

  const handleClear = () => {
    setJsonText('');
    setError(null);
    onClear();
  };

  const handleLoadSample = () => {
    setJsonText(JSON.stringify(SAMPLE_JSON, null, 2));
    setError(null);
  };

  return (
    <div className="w-full h-full flex flex-col space-y-4 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
          JSON Input
        </h2>
        <button
          onClick={handleLoadSample}
          className="px-3 py-1.5 text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          Load Sample
        </button>
      </div>

      <textarea
        value={jsonText}
        onChange={(e) => {
          setJsonText(e.target.value);
          setError(null);
        }}
        placeholder="Paste or type your JSON here..."
        className={`
          flex-1 p-4 font-mono text-sm
          bg-gray-50 dark:bg-gray-900
          text-gray-900 dark:text-gray-100
          border-2 rounded-lg
          focus:outline-none focus:ring-2 focus:ring-blue-500
          resize-none scrollbar-thin
          ${error 
            ? 'border-red-500 dark:border-red-400' 
            : 'border-gray-300 dark:border-gray-600'
          }
        `}
      />

      {error && (
        <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-300 dark:border-red-800 rounded-md">
          <p className="text-sm text-red-700 dark:text-red-400 font-medium">
            ❌ Invalid JSON: {error}
          </p>
        </div>
      )}

      <div className="flex gap-3">
        <button
          onClick={handleVisualize}
          disabled={!jsonText.trim()}
          className="
            flex-1 px-6 py-3 
            bg-gradient-to-r from-blue-500 to-purple-600 
            hover:from-blue-600 hover:to-purple-700
            disabled:from-gray-400 disabled:to-gray-500
            text-white font-semibold rounded-lg
            transition-all duration-200
            disabled:cursor-not-allowed disabled:opacity-50
            shadow-md hover:shadow-lg
          "
        >
           Visualize Tree
        </button>
        
        <button
          onClick={handleClear}
          className="
            px-6 py-3 
            bg-gray-200 dark:bg-gray-700 
            hover:bg-gray-300 dark:hover:bg-gray-600
            text-gray-700 dark:text-gray-300 
            font-semibold rounded-lg
            transition-colors duration-200
            shadow-md hover:shadow-lg
          "
        >
          🗑️ Clear
        </button>
      </div>
    </div>
  );
};

export default JsonInput;
