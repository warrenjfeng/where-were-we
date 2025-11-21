import { useEffect, useRef } from 'react';
import { calculateDistance, formatDistance, calculateScore, getDistanceMessage } from '../utils/distance';
import './RoundSummary.css';

/**
 * RoundSummary Component
 * Shows the results after a guess is submitted:
 * - Actual location vs guessed location
 * - Distance between them
 * - Score
 * - Memory caption (if in Memory Mode)
 */
export default function RoundSummary({ 
  actualLocation, 
  guessedLocation, 
  caption, 
  onNextRound 
}) {
  const mapRef = useRef(null);
  
  const distance = calculateDistance(actualLocation, guessedLocation);
  const score = calculateScore(distance);
  const message = getDistanceMessage(distance);

  useEffect(() => {
    if (!window.google || !mapRef.current) return;

    // Create map showing both locations
    const bounds = new window.google.maps.LatLngBounds();
    bounds.extend(new window.google.maps.LatLng(actualLocation.lat, actualLocation.lng));
    bounds.extend(new window.google.maps.LatLng(guessedLocation.lat, guessedLocation.lng));

    const map = new window.google.maps.Map(mapRef.current, {
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
    });

    map.fitBounds(bounds);

    // Add marker for actual location (green)
    new window.google.maps.Marker({
      position: actualLocation,
      map: map,
      label: '🎯',
      title: 'Actual Location',
    });

    // Add marker for guessed location (pink)
    new window.google.maps.Marker({
      position: guessedLocation,
      map: map,
      icon: {
        path: window.google.maps.SymbolPath.CIRCLE,
        scale: 10,
        fillColor: '#FF69B4',
        fillOpacity: 0.8,
        strokeColor: '#fff',
        strokeWeight: 2,
      },
      title: 'Your Guess',
    });

    // Draw line connecting the two points
    new window.google.maps.Polyline({
      path: [actualLocation, guessedLocation],
      geodesic: true,
      strokeColor: '#FF69B4',
      strokeOpacity: 0.8,
      strokeWeight: 3,
      map: map,
    });

  }, [actualLocation, guessedLocation]);

  return (
    <div className="round-summary">
      <div className="summary-header">
        <h2>Round Results! 🎉</h2>
      </div>

      <div className="summary-content">
        <div className="score-display">
          <div className="score-number">{score.toLocaleString()}</div>
          <div className="score-label">points</div>
        </div>

        <div className="distance-info">
          <div className="distance-value">{formatDistance(distance)}</div>
          <div className="distance-message">{message}</div>
        </div>

        {caption && (
          <div className="memory-caption">
            <div className="caption-icon">💭</div>
            <div className="caption-text">{caption}</div>
          </div>
        )}

        <div ref={mapRef} className="result-map" />

        <div className="summary-legend">
          <div className="legend-item">
            <span className="legend-marker actual">🎯</span>
            <span>Actual Location</span>
          </div>
          <div className="legend-item">
            <span className="legend-marker guess">📍</span>
            <span>Your Guess</span>
          </div>
        </div>
      </div>

      <div className="summary-footer">
        <button className="next-round-btn" onClick={onNextRound}>
          Next Round! 🚀
        </button>
      </div>
    </div>
  );
}


