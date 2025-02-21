import { useState } from 'react';
import './App.css';

function App() {
  const [inputData, setInputData] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [selectedFilters, setSelectedFilters] = useState(['all']);

  const filterOptions = [
    { value: 'all', label: 'Show All' },
    { value: 'alphabets', label: 'Alphabets' },
    { value: 'numbers', label: 'Numbers' },
    { value: 'highest', label: 'Highest Alphabet' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const parsedData = JSON.parse(inputData);
      
      // Mock response based on the input data
      const mockResponse = {
        is_success: true,
        user_id: "prince_ranjan_23112002",
        email: "raj625209@gmail.com",
        roll_number: "22BCS12733",
        numbers: parsedData.data.filter(item => !isNaN(item)),
        alphabets: parsedData.data.filter(item => isNaN(item)),
        highest_alphabet: [parsedData.data.filter(item => isNaN(item)).sort().pop()]
      };
      
      setResponse(mockResponse);
    } catch (err) {
      setError('Please enter valid JSON format: {"data": ["A","1","B","2"]}');
      console.error('Error:', err);
    }
  };

  const toggleFilter = (value) => {
    if (value === 'all') {
      setSelectedFilters(['all']);
    } else {
      setSelectedFilters(prev => {
        if (prev.includes('all')) {
          return [value];
        }
        if (prev.includes(value)) {
          const newFilters = prev.filter(f => f !== value);
          return newFilters.length ? newFilters : ['all'];
        }
        return [...prev, value];
      });
    }
  };

  const formatResponse = () => {
    if (!response) return null;
    
    const sections = [];
    
    if (selectedFilters.includes('all') || selectedFilters.includes('alphabets')) {
      sections.push(
        <div key="alphabets" className="response-item">
          <h3>Alphabets</h3>
          <div className="value-box">
            {response.alphabets.map((alpha, index) => (
              <span key={index} className="value-chip">{alpha}</span>
            ))}
          </div>
        </div>
      );
    }
    
    if (selectedFilters.includes('all') || selectedFilters.includes('numbers')) {
      sections.push(
        <div key="numbers" className="response-item">
          <h3>Numbers</h3>
          <div className="value-box">
            {response.numbers.map((num, index) => (
              <span key={index} className="value-chip">{num}</span>
            ))}
          </div>
        </div>
      );
    }
    
    if (selectedFilters.includes('all') || selectedFilters.includes('highest')) {
      sections.push(
        <div key="highest" className="response-item">
          <h3>Highest Alphabet</h3>
          <div className="value-box">
            <span className="value-chip highlight">{response.highest_alphabet[0]}</span>
          </div>
        </div>
      );
    }
    
    return sections;
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Data Processing Tool</h1>
        <div className="card">
          <h2>Input Data</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <textarea
                value={inputData}
                onChange={(e) => setInputData(e.target.value)}
                placeholder='{"data": ["M","1","334","4","B"]}'
                className="json-input"
              />
              {error && <div className="error">{error}</div>}
            </div>
            <button type="submit" className="submit-btn">Process Data</button>
          </form>
        </div>
        
        {response && (
          <div className="card result-card">
            <div className="filter-section">
              <h2>Filter Results</h2>
              <div className="filter-tags">
                {filterOptions.map(option => (
                  <button
                    key={option.value}
                    className={`filter-tag ${selectedFilters.includes(option.value) ? 'active' : ''}`}
                    onClick={() => toggleFilter(option.value)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="results-section">
              <h2>Results</h2>
              <div className="response-grid">
                {formatResponse()}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
