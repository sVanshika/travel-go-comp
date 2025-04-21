// API service for making requests to the backend

// Base URL for API requests
const API_BASE_URL = "/api"

// Helper function for making API requests
async function fetchAPI(endpoint, options = {}) {
  const url = `${API_BASE_URL}/${endpoint}`

  const defaultOptions = {
    headers: {
      "Content-Type": "application/json",
    },
  }

  const response = await fetch(url, {
    ...defaultOptions,
    ...options,
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || "Something went wrong")
  }

  return data
}

// Authentication services
export const authService = {
  login: async (email, password) => {
    return fetchAPI("auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    })
  },

  signup: async (name, email, password) => {
    return fetchAPI("auth/signup", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    })
  },

  logout: async () => {
    return fetchAPI("auth/logout", {
      method: "POST",
    })
  },
}

// Itinerary services
export const itineraryService = {
  generateItinerary: async (destination, startDate, endDate, budget) => {
    return fetchAPI("itinerary", {
      method: "POST",
      body: JSON.stringify({ destination, startDate, endDate, budget }),
    })
  },

  getItinerary: async (id) => {
    return fetchAPI(`itinerary/${id}`)
  },

  saveItinerary: async (itinerary) => {
    return fetchAPI("itinerary/save", {
      method: "POST",
      body: JSON.stringify({ itinerary }),
    })
  },

  getUserItineraries: async () => {
    return fetchAPI("itinerary/user")
  },
}

// Packing list services
export const packingService = {
  getSuggestions: async (destination, startDate, endDate) => {
    return fetchAPI("packing", {
      method: "POST",
      body: JSON.stringify({ destination, startDate, endDate }),
    })
  },

  savePackingList: async (tripId, items) => {
    return fetchAPI("packing/save", {
      method: "POST",
      body: JSON.stringify({ tripId, items }),
    })
  },

  getPackingList: async (tripId) => {
    return fetchAPI(`packing/${tripId}`)
  },
}

// User profile services
export const userService = {
  getProfile: async () => {
    return fetchAPI("user/profile")
  },

  updateProfile: async (userData) => {
    return fetchAPI("user/profile", {
      method: "PUT",
      body: JSON.stringify(userData),
    })
  },

  getPastTrips: async () => {
    return fetchAPI("user/trips")
  },
}

// Chat assistant services
export const chatService = {
  sendMessage: async (message) => {
    return fetchAPI("chat", {
      method: "POST",
      body: JSON.stringify({ message }),
    })
  },
}
