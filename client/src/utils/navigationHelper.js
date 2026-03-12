/**
 * navigationHelper.js
 *
 * Provides a way to programmatically navigate from outside React components
 * (e.g., inside the Axios interceptor).
 *
 * Usage:
 *  1. In your root component (App.jsx), call `setNavigate(navigate)` once.
 *  2. Anywhere else, call `navigateTo('/401')`.
 */

let _navigate = null;

export const setNavigate = (navigateFn) => {
  _navigate = navigateFn;
};

export const navigateTo = (path) => {
  if (_navigate) {
    _navigate(path);
  } else {
    // Fallback if navigate hasn't been injected yet
    window.location.href = path;
  }
};
