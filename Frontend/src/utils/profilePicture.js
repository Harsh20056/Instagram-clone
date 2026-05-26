// Default avatar as base64 SVG (same as backend)
const DEFAULT_AVATAR = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgMjAwIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+CiAgPGNpcmNsZSBjeD0iMTAwIiBjeT0iMTAwIiByPSIxMDAiIGZpbGw9IiNlNWU3ZWIiLz4KICA8Y2lyY2xlIGN4PSIxMDAiIGN5PSI3NSIgcj0iMzUiIGZpbGw9IiM5Y2EzYWYiLz4KICA8ZWxsaXBzZSBjeD0iMTAwIiBjeT0iMTYwIiByeD0iNjAiIHJ5PSI0MCIgZmlsbD0iIzljYTNhZiIvPgo8L3N2Zz4=";

/**
 * Get profile picture URL with fallback to default avatar
 * @param {string} profilePicture - The profile picture URL from user object
 * @returns {string} Valid profile picture URL
 */
export const getProfilePicture = (profilePicture) => {
  // If no profile picture or invalid path, return default
  if (!profilePicture || profilePicture === "/images/default-avatar.svg") {
    return DEFAULT_AVATAR;
  }
  
  return profilePicture;
};
