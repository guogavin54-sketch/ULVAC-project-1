/**
 * ================================================
 * ULVAC Authentication Check
 * ================================================
 * Checks if user is authenticated before accessing protected pages
 */

(function() {
  'use strict';

  if (window.ULVAC_AUTH_BYPASS) {
    window.ULVACAuth = {
      isAuthenticated: function() { return true; },
      getAuthToken: function() { return null; },
      logout: function() {}
    };
    return;
  }

  // ================================================
  // Configuration
  // ================================================
  const TOKEN_KEY = 'ulvac_auth_token';
  const LOGIN_PAGE = 'login.html';

  // ================================================
  // Authentication Check
  // ================================================
  function isAuthenticated() {
    const token = localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY);
    return !!token;
  }

  function getAuthToken() {
    return localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY);
  }

  // ================================================
  // Logout Function
  // ================================================
  function logout() {
    localStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(TOKEN_KEY);
    window.location.href = LOGIN_PAGE;
  }

  // ================================================
  // Make functions globally accessible
  // ================================================
  window.ULVACAuth = {
    isAuthenticated,
    getAuthToken,
    logout
  };

  // ================================================
  // Run authentication check
  // ================================================
  function checkAuth() {
    // Skip check if already on login page
    if (window.location.pathname.endsWith(LOGIN_PAGE)) {
      return;
    }

    // Redirect to login if not authenticated
    if (!isAuthenticated()) {
      window.location.href = LOGIN_PAGE;
    }
  }

  // ================================================
  // Initialize
  // ================================================
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', checkAuth);
  } else {
    checkAuth();
  }

})();
