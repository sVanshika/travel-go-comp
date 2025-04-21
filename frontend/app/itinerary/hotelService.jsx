export const fetchHotels = async (destination) => {
  const url = 'http://127.0.0.1:8000/itinerary/gethotels';
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ destination }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch hotels');
    }

    console.log("fetched hotels")
    console.log(response.hotels)

    const data = await response.json();
    return data; // Assuming the response is a list of hotels
  } catch (error) {
    console.error('Error fetching hotels:', error);
    throw error; // Rethrow the error for further handling
  }
};
