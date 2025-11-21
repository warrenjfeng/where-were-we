/**
 * Parses various location input formats and returns coordinates
 * Supports:
 * - Google Maps URLs (with lat/lng or place IDs)
 * - City names / addresses (requires Geocoding API)
 * - Direct coordinates
 */

export async function parseLocationInput(input) {
  if (!input || typeof input !== 'string') {
    throw new Error('Invalid input');
  }

  const trimmedInput = input.trim();

  // Try to extract coordinates from Google Maps URL
  const coords = extractCoordsFromMapsUrl(trimmedInput);
  if (coords) {
    return coords;
  }

  // If it looks like an address or city name, use Geocoding API
  return await geocodeAddress(trimmedInput);
}

/**
 * Extracts lat/lng from various Google Maps URL formats
 * Supports:
 * - https://www.google.com/maps/@37.7749,-122.4194,15z
 * - https://www.google.com/maps/place/.../@37.7749,-122.4194
 * - https://maps.app.goo.gl/... (redirects to full URL)
 */
export function extractCoordsFromMapsUrl(url) {
  // Pattern 1: /@lat,lng format
  const pattern1 = /@(-?\d+\.\d+),(-?\d+\.\d+)/;
  const match1 = url.match(pattern1);
  if (match1) {
    return {
      lat: parseFloat(match1[1]),
      lng: parseFloat(match1[2])
    };
  }

  // Pattern 2: /maps?q=lat,lng format
  const pattern2 = /[?&]q=(-?\d+\.\d+),(-?\d+\.\d+)/;
  const match2 = url.match(pattern2);
  if (match2) {
    return {
      lat: parseFloat(match2[1]),
      lng: parseFloat(match2[2])
    };
  }

  // Pattern 3: ll=lat,lng format
  const pattern3 = /[?&]ll=(-?\d+\.\d+),(-?\d+\.\d+)/;
  const match3 = url.match(pattern3);
  if (match3) {
    return {
      lat: parseFloat(match3[1]),
      lng: parseFloat(match3[2])
    };
  }

  return null;
}

/**
 * Uses Google Maps Geocoding API to convert address to coordinates
 */
export async function geocodeAddress(address) {
  return new Promise((resolve, reject) => {
    if (!window.google || !window.google.maps) {
      reject(new Error('Google Maps API not loaded'));
      return;
    }

    const geocoder = new window.google.maps.Geocoder();
    
    geocoder.geocode({ address }, (results, status) => {
      if (status === 'OK' && results[0]) {
        const location = results[0].geometry.location;
        resolve({
          lat: location.lat(),
          lng: location.lng(),
          formattedAddress: results[0].formatted_address
        });
      } else {
        reject(new Error(`Geocoding failed: ${status}`));
      }
    });
  });
}

/**
 * Validates if coordinates are valid
 */
export function isValidCoordinates(coords) {
  return (
    coords &&
    typeof coords.lat === 'number' &&
    typeof coords.lng === 'number' &&
    coords.lat >= -90 &&
    coords.lat <= 90 &&
    coords.lng >= -180 &&
    coords.lng <= 180
  );
}


