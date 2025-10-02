// Reverse geocoding using OpenStreetMap Nominatim API
export const reverseGeocode = async (lat: number, lng: number): Promise<string> => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`,
      {
        headers: {
          'Accept-Language': 'en',
        },
      }
    );
    
    if (!response.ok) {
      throw new Error('Geocoding failed');
    }
    
    const data = await response.json();
    
    // Build address from components
    const address = data.address;
    const parts = [
      address.road,
      address.suburb || address.neighbourhood,
      address.city || address.town || address.village,
      address.state,
    ].filter(Boolean);
    
    return parts.join(', ') || data.display_name || 'Unknown Location';
  } catch (error) {
    console.error('Geocoding error:', error);
    return `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
  }
};