// Local storage utility functions

// Set an item in localStorage with optional expiration
export function setStorageItem(key, value, expirationDays = null) {
  const item = {
    value,
    timestamp: new Date().getTime(),
  }

  if (expirationDays) {
    item.expiration = new Date().getTime() + expirationDays * 24 * 60 * 60 * 1000
  }

  localStorage.setItem(key, JSON.stringify(item))
}

// Get an item from localStorage, respecting expiration
export function getStorageItem(key) {
  const itemStr = localStorage.getItem(key)

  if (!itemStr) {
    return null
  }

  try {
    const item = JSON.parse(itemStr)

    // Check if the item has expired
    if (item.expiration && new Date().getTime() > item.expiration) {
      localStorage.removeItem(key)
      return null
    }

    return item.value
  } catch (error) {
    console.error(`Error parsing localStorage item ${key}:`, error)
    return null
  }
}

// Remove an item from localStorage
export function removeStorageItem(key) {
  localStorage.removeItem(key)
}

// Clear all items from localStorage
export function clearStorage() {
  localStorage.clear()
}

// Get all keys in localStorage
export function getStorageKeys() {
  return Object.keys(localStorage)
}

// Check if an item exists in localStorage
export function hasStorageItem(key) {
  return localStorage.getItem(key) !== null
}

// Set multiple items in localStorage
export function setMultipleStorageItems(items) {
  for (const [key, value] of Object.entries(items)) {
    setStorageItem(key, value)
  }
}

// Get multiple items from localStorage
export function getMultipleStorageItems(keys) {
  const result = {}

  for (const key of keys) {
    result[key] = getStorageItem(key)
  }

  return result
}
