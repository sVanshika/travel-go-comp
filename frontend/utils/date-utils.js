// Date utility functions

// Format a date as YYYY-MM-DD
export function formatDateYYYYMMDD(date) {
  return date.toISOString().split("T")[0]
}

// Format a date in a human-readable format
export function formatDateHuman(date) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

// Format a date range
export function formatDateRange(startDate, endDate) {
  const start = new Date(startDate)
  const end = new Date(endDate)

  const startMonth = start.toLocaleDateString("en-US", { month: "short" })
  const startDay = start.getDate()

  const endMonth = end.toLocaleDateString("en-US", { month: "short" })
  const endDay = end.getDate()
  const endYear = end.getFullYear()

  if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
    return `${startMonth} ${startDay} - ${endDay}, ${endYear}`
  } else if (start.getFullYear() === end.getFullYear()) {
    return `${startMonth} ${startDay} - ${endMonth} ${endDay}, ${endYear}`
  } else {
    const startYear = start.getFullYear()
    return `${startMonth} ${startDay}, ${startYear} - ${endMonth} ${endDay}, ${endYear}`
  }
}

// Calculate the number of days between two dates
export function calculateDays(startDate, endDate) {
  const start = new Date(startDate)
  const end = new Date(endDate)

  // Set hours to 0 to avoid time zone issues
  start.setHours(0, 0, 0, 0)
  end.setHours(0, 0, 0, 0)

  // Calculate the difference in milliseconds
  const diffTime = Math.abs(end - start)

  // Convert to days and add 1 (inclusive of both start and end dates)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1

  return diffDays
}

// Check if a date is in the past
export function isDateInPast(date) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const checkDate = new Date(date)
  checkDate.setHours(0, 0, 0, 0)

  return checkDate < today
}

// Check if a date is in the future
export function isDateInFuture(date) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const checkDate = new Date(date)
  checkDate.setHours(0, 0, 0, 0)

  return checkDate > today
}

// Get an array of dates between start and end dates
export function getDatesBetween(startDate, endDate) {
  const dates = []
  const currentDate = new Date(startDate)
  const end = new Date(endDate)

  // Set hours to 0 to avoid time zone issues
  currentDate.setHours(0, 0, 0, 0)
  end.setHours(0, 0, 0, 0)

  while (currentDate <= end) {
    dates.push(new Date(currentDate))
    currentDate.setDate(currentDate.getDate() + 1)
  }

  return dates
}
