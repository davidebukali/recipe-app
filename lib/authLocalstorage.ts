// The key used to store the logged-in user in localStorage.
const STORAGE_KEY = "auth";

export interface User {
  username: string;
  email: string;
  password: string;
}

/**
 * Logs in a user by checking credentials against the saved user in localStorage.
 * If credentials match, the function returns true.
 * This assumes the user data is already stored in localStorage via a separate process (e.g., registration).
 * @param email - The user's email
 * @param password - The user's password
 * @returns true if login successful, false otherwise
 */
export const login = (email: string, password: string): boolean => {
  try {
    const user = getLoggedInUser();
    if (!user) {
      return false; // No user found in localStorage to check against
    }
    // Check if the provided credentials match the saved user
    if (user.email === email && user.password === password) {
      return true; // Credentials match, login successful
    }
    return false; // Invalid credentials
  } catch (error) {
    console.error("Failed to log in:", error);
    return false;
  }
};

/**
 * Logs out the user by removing the localStorage entry.
 */
export const logout = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Failed to log out:", error);
  }
};

/**
 * Checks if a user is logged in by retrieving the object from localStorage.
 * @returns The logged-in user object or null if not logged in
 */
export const getLoggedInUser = (): User | null => {
  try {
    const serializedUser = localStorage.getItem(STORAGE_KEY);
    if (!serializedUser) {
      return null;
    }
    // Since the key now stores a single object, we can parse it directly.
    return JSON.parse(serializedUser);
  } catch (error) {
    console.error("Failed to retrieve logged-in user:", error);
    return null;
  }
};

/**
 * Checks if there is an active login session.
 * @returns true if a user is logged in, false otherwise
 */
export const isLoggedIn = (): boolean => {
  return getLoggedInUser() !== null;
};

/**
 * Saves a user to localStorage. This is a helper function for demonstration
 * purposes and would typically be called after a successful registration.
 * @param user - The user object to save.
 */
export const saveUser = (user: User): boolean => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    return true;
  } catch (error) {
    console.error("Failed to save user:", error);
    return false;
  }
};
