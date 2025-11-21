import { useState } from 'react';
import { parseLocationInput } from '../utils/parseLocationInput';
import './LocationInput.css';

/**
 * LocationInput Component
 * Allows users to input a location via Google Maps URL, city name, or address
 */
export default function LocationInput({ onLocationSubmit, playerName = 'You' }) {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!input.trim()) {
      setError('Please enter a location');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const location = await parseLocationInput(input);
      onLocationSubmit(location);
      setInput('');
    } catch (err) {
      setError(err.message || 'Failed to parse location. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="location-input">
      <div className="location-input-header">
        <h2>🗺️ {playerName}'s Turn to Pick a Spot!</h2>
        <p>Enter a Google Maps link, city name, or address</p>
      </div>

      <form onSubmit={handleSubmit} className="location-form">
        <div className="input-group">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g., Paris, France
or https://maps.google.com/...
or 1600 Pennsylvania Ave NW, Washington, DC"
            rows={4}
            disabled={isLoading}
            className="location-textarea"
          />
        </div>

        {error && (
          <div className="error-message">
            ⚠️ {error}
          </div>
        )}

        <button 
          type="submit" 
          className="submit-location-btn"
          disabled={isLoading || !input.trim()}
        >
          {isLoading ? (
            <>
              <span className="btn-spinner"></span>
              Processing...
            </>
          ) : (
            'Set This Location! 🎯'
          )}
        </button>
      </form>

      <div className="location-input-tips">
        <div className="tip-title">💡 Tips:</div>
        <ul>
          <li>Share a Google Maps link from your phone or browser</li>
          <li>Type a famous landmark: "Eiffel Tower, Paris"</li>
          <li>Enter any street address</li>
        </ul>
      </div>
    </div>
  );
}


