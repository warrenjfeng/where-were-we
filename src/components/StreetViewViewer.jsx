import { useEffect, useRef, useState } from 'react';
import './StreetViewViewer.css';

/**
 * StreetViewViewer Component
 * Displays Google Street View panorama for given coordinates
 * Falls back to static map if Street View is unavailable
 */
export default function StreetViewViewer({ location, onStreetViewStatus }) {
  const panoramaRef = useRef(null);
  const [streetViewAvailable, setStreetViewAvailable] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!location || !window.google) return;

    setIsLoading(true);
    
    // Initialize Street View Service to check availability
    const streetViewService = new window.google.maps.StreetViewService();
    const position = new window.google.maps.LatLng(location.lat, location.lng);

    // Check if Street View is available at this location
    streetViewService.getPanorama(
      { location: position, radius: 50 },
      (data, status) => {
        if (status === 'OK') {
          // Street View is available
          setStreetViewAvailable(true);
          
          // Initialize panorama
          const panorama = new window.google.maps.StreetViewPanorama(
            panoramaRef.current,
            {
              position: position,
              pov: { heading: 0, pitch: 0 },
              zoom: 1,
              addressControl: false,
              showRoadLabels: false,
              enableCloseButton: false,
              fullscreenControl: false,
            }
          );
          
          if (onStreetViewStatus) {
            onStreetViewStatus(true);
          }
        } else {
          // Street View not available, use static map
          setStreetViewAvailable(false);
          if (onStreetViewStatus) {
            onStreetViewStatus(false);
          }
        }
        setIsLoading(false);
      }
    );
  }, [location, onStreetViewStatus]);

  if (!location) {
    return (
      <div className="street-view-viewer">
        <div className="street-view-placeholder">
          <p>🗺️ Waiting for location...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="street-view-viewer">
      {isLoading && (
        <div className="street-view-loading">
          <div className="spinner"></div>
          <p>Loading view...</p>
        </div>
      )}
      
      {!streetViewAvailable && !isLoading && (
        <div className="static-map-fallback">
          <img
            src={`https://maps.googleapis.com/maps/api/staticmap?center=${location.lat},${location.lng}&zoom=15&size=800x600&maptype=satellite&key=AIzaSyDgTPcau_imsD2xzg16QdA9h8gYd3R7ggY`}
            alt="Location map"
          />
          <div className="fallback-notice">
            📸 Street View unavailable - showing satellite view
          </div>
        </div>
      )}
      
      <div 
        ref={panoramaRef} 
        className="panorama-container"
        style={{ display: streetViewAvailable && !isLoading ? 'block' : 'none' }}
      />
    </div>
  );
}


