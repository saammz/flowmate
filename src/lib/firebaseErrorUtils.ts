import { FirebaseError } from 'firebase/app';

export const getFirebaseErrorMessage = (error: any): string => {
  // Handle Firebase Auth errors
  if (error?.code) {
    switch (error.code) {
      // Authentication errors
      case 'auth/user-not-found':
        return 'No account found with this email address.';
      case 'auth/wrong-password':
        return 'Incorrect password. Please try again.';
      case 'auth/invalid-email':
        return 'Please enter a valid email address.';
      case 'auth/user-disabled':
        return 'This account has been disabled. Please contact support.';
      case 'auth/email-already-in-use':
        return 'An account with this email already exists.';
      case 'auth/weak-password':
        return 'Password should be at least 6 characters long.';
      case 'auth/operation-not-allowed':
        return 'Email/password accounts are not enabled. Please contact support.';
      case 'auth/invalid-credential':
        return 'Invalid email or password. Please check your credentials.';
      case 'auth/too-many-requests':
        return 'Too many unsuccessful attempts. Please try again later.';
      case 'auth/network-request-failed':
        return 'Network error. Please check your connection and try again.';
      case 'auth/requires-recent-login':
        return 'Please log out and log back in to continue.';
      case 'auth/user-token-expired':
        return 'Your session has expired. Please log in again.';
      case 'auth/invalid-api-key':
        return 'Configuration error. Please contact support.';
      case 'auth/app-deleted':
        return 'Configuration error. Please contact support.';
      case 'auth/expired-action-code':
        return 'This link has expired. Please request a new one.';
      case 'auth/invalid-action-code':
        return 'This link is invalid. Please request a new one.';
      case 'auth/invalid-verification-code':
        return 'Invalid verification code. Please try again.';
      case 'auth/invalid-verification-id':
        return 'Invalid verification ID. Please try again.';
      case 'auth/missing-verification-code':
        return 'Please enter the verification code.';
      case 'auth/missing-verification-id':
        return 'Verification ID is missing. Please try again.';
      case 'auth/credential-already-in-use':
        return 'This credential is already associated with another account.';
      case 'auth/timeout':
        return 'Request timed out. Please try again.';
      case 'auth/missing-password':
        return 'Please enter your password.';
      case 'auth/missing-email':
        return 'Please enter your email address.';
      case 'auth/internal-error':
        return 'An internal error occurred. Please try again later.';

      // Custom backend errors
      case 'auth/user-creation-failed':
        return 'Failed to create user account. Please try again.';

      default:
        // Return a generic message for unknown Firebase errors
        if (error.code.startsWith('auth/')) {
          return 'Authentication error. Please try again or contact support.';
        }
        break;
    }
  }

  // Handle network/backend errors
  if (error?.response) {
    const status = error.response.status;
    const message = error.response.data?.message || error.response.data?.error;

    switch (status) {
      case 400:
        return message || 'Invalid request. Please check your information.';
      case 401:
        return 'Authentication failed. Please check your credentials.';
      case 403:
        return 'Access denied. Please contact support.';
      case 404:
        return 'Service not found. Please try again later.';
      case 409:
        return message || 'This email is already registered.';
      case 422:
        return message || 'Invalid data provided. Please check your information.';
      case 429:
        return 'Too many requests. Please wait a moment and try again.';
      case 500:
        return 'Server error. Please try again later.';
      case 502:
      case 503:
      case 504:
        return 'Service temporarily unavailable. Please try again later.';
      default:
        return message || 'An unexpected error occurred. Please try again.';
    }
  }

  // Handle network errors
  if (error?.code === 'NETWORK_ERROR' || error?.message?.includes('network')) {
    return 'Network error. Please check your internet connection.';
  }

  // Handle timeout errors
  if (error?.code === 'ECONNABORTED' || error?.message?.includes('timeout')) {
    return 'Request timed out. Please try again.';
  }

  // Generic error message
  return error?.message || 'An unexpected error occurred. Please try again.';
};