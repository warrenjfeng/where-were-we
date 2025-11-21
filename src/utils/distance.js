/**
 * Calculate distance between two coordinates using Haversine formula
 * Returns distance in kilometers
 */
export function calculateDistance(coord1, coord2) {
  const R = 6371; // Earth's radius in kilometers
  
  const lat1 = toRadians(coord1.lat);
  const lat2 = toRadians(coord2.lat);
  const deltaLat = toRadians(coord2.lat - coord1.lat);
  const deltaLng = toRadians(coord2.lng - coord1.lng);

  const a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
            Math.cos(lat1) * Math.cos(lat2) *
            Math.sin(deltaLng / 2) * Math.sin(deltaLng / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
  const distance = R * c;
  
  return distance;
}

/**
 * Convert degrees to radians
 */
function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}

/**
 * Format distance for display
 * Shows meters if under 1km, otherwise kilometers
 */
export function formatDistance(distanceKm) {
  if (distanceKm < 1) {
    return `${Math.round(distanceKm * 1000)}m`;
  } else if (distanceKm < 10) {
    return `${distanceKm.toFixed(2)}km`;
  } else {
    return `${Math.round(distanceKm)}km`;
  }
}

/**
 * Calculate score based on distance
 * Perfect score (5000) for very close, decreasing with distance
 */
export function calculateScore(distanceKm) {
  if (distanceKm < 0.01) return 5000; // Within 10 meters
  if (distanceKm < 0.1) return 4500;  // Within 100 meters
  if (distanceKm < 1) return 4000;    // Within 1 km
  if (distanceKm < 10) return 3000;   // Within 10 km
  if (distanceKm < 50) return 2000;   // Within 50 km
  if (distanceKm < 100) return 1000;  // Within 100 km
  if (distanceKm < 500) return 500;   // Within 500 km
  return 100;                          // Over 500 km
}

/**
 * Get a fun message based on distance
 */
export function getDistanceMessage(distanceKm) {
  if (distanceKm < 0.01) {
    return "Wow! Did you cheat? That's basically perfect! 🎯";
  } else if (distanceKm < 0.1) {
    return "Incredible! You remember this place like yesterday! 💖";
  } else if (distanceKm < 1) {
    return "So close! You've got a great memory! 🌟";
  } else if (distanceKm < 10) {
    return "Not bad! You're in the right neighborhood! 🏘️";
  } else if (distanceKm < 50) {
    return "Getting warmer... at least you're in the same city! 🗺️";
  } else if (distanceKm < 100) {
    return "Your guess was closer than my luggage at SFO 😅";
  } else if (distanceKm < 500) {
    return "Well, you got the general region... I think? 🤔";
  } else {
    return "Were we even on the same planet? 🌍😂";
  }
}


