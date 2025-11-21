import { useEffect, useRef, useState } from 'react';
import './GuessMap.css';

/**
 * GuessMap Component
 * Interactive map where users can drop a pin to guess the location
 */
export default function GuessMap({ onGuessSubmit, disabled = false }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);
  const [guessLocation, setGuessLocation] = useState(null);

  useEffect(() => {
    if (!window.google || !mapRef.current) return;

    // Initialize map centered on world view
    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat: 20, lng: 0 },
      zoom: 2,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
    });

    mapInstanceRef.current = map;

    // Add click listener to place marker
    map.addListener('click', (e) => {
      if (disabled) return;
      
      const location = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      };

      // Remove existing marker if any
      if (markerRef.current) {
        markerRef.current.setMap(null);
      }

      // Create new marker
      markerRef.current = new window.google.maps.Marker({
        position: location,
        map: map,
        animation: window.google.maps.Animation.DROP,
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: 10,
          fillColor: '#FF69B4',
          fillOpacity: 0.8,
          strokeColor: '#fff',
          strokeWeight: 2,
        },
      });

      setGuessLocation(location);
    });

    return () => {
      if (markerRef.current) {
        markerRef.current.setMap(null);
      }
    };
  }, [disabled]);

  const handleSubmit = () => {
    if (guessLocation && onGuessSubmit) {
      onGuessSubmit(guessLocation);
    }
  };

  return (
    <div className="guess-map">
      <div className="guess-map-header">
        <h3>📍 Where do you think this is?</h3>
        <p className="guess-hint">Click anywhere on the map to drop your guess pin</p>
      </div>
      
      <div ref={mapRef} className="map-container" />
      
      <div className="guess-map-footer">
        {guessLocation ? (
          <button 
            className="submit-guess-btn"
            onClick={handleSubmit}
            disabled={disabled}
          >
            Submit My Guess! 🎯
          </button>
        ) : (
          <p className="waiting-text">Drop a pin to make your guess...</p>
        )}
      </div>
    </div>
  );
}


