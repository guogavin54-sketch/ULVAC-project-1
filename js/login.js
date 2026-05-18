/**
 * ================================================
 * ULVAC Login Page Script
 * ================================================
 * Features:
 * - Form Validation
 * - CSRF Protection
 * - XSS Protection
 * - Password Visibility Toggle
 * - JWT Authentication Simulation
 * - Session Management
 * - Login State Persistence
 * ================================================
 */

(function() {
  'use strict';

  // ================================================
  // DOM Elements
  // ================================================
  const loginForm = document.getElementById('login-form');
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');
  const togglePasswordBtn = document.getElementById('toggle-password');
  const eyeIcon = document.getElementById('eye-icon');
  const eyeOffIcon = document.getElementById('eye-off-icon');
  const loginButton = document.getElementById('login-button');
  const buttonText = document.getElementById('button-text');
  const buttonSpinner = document.getElementById('button-spinner');
  const errorMessage = document.getElementById('error-message');
  const errorText = document.getElementById('error-text');
  const usernameError = document.getElementById('username-error');
  const passwordError = document.getElementById('password-error');
  const rememberMeCheckbox = document.getElementById('remember-me');
  const csrfTokenInput = document.getElementById('csrf-token');

  // ================================================
  // Constants
  // ================================================
  const MIN_PASSWORD_LENGTH = 1; // 不再限制密码长度
  const VALIDATION_DEBOUNCE_MS = 300;
  const API_ENDPOINT = '/api/login'; // Replace with your actual endpoint
  const TOKEN_KEY = 'ulvac_auth_token';
  const REMEMBER_ME_KEY = 'ulvac_remember_me';

  // ================================================
  // Security: XSS Protection - Sanitize Input
  // ================================================
  function sanitizeInput(input) {
    const tempDiv = document.createElement('div');
    tempDiv.textContent = input;
    return tempDiv.innerHTML;
  }

  // ================================================
  // Security: Generate CSRF Token
  // ================================================
  function generateCSRFToken() {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  }

  // ================================================
  // Security: Validate Input - 简化验证
  // ================================================
  function validateUsername(username) {
    const trimmed = username.trim();
    if (!trimmed) {
      return { valid: false, message: 'Username is required' };
    }
    // 不验证格式，只检查是否为空
    return { valid: true, message: '' };
  }

  function validatePassword(password) {
    if (!password) {
      return { valid: false, message: 'Password is required' };
    }
    // 不验证密码长度，只检查是否为空
    return { valid: true, message: '' };
  }

  // ================================================
  // UI: Show/Hide Errors
  // ================================================
  function showFieldError(element, errorSpan, message) {
    element.classList.add('has-error');
    errorSpan.textContent = message;
    errorSpan.hidden = false;
  }

  function hideFieldError(element, errorSpan) {
    element.classList.remove('has-error');
    errorSpan.hidden = true;
  }

  function showGeneralError(message) {
    errorText.textContent = message;
    errorMessage.hidden = false;
  }

  function hideGeneralError() {
    errorMessage.hidden = true;
  }

  function clearAllErrors() {
    hideGeneralError();
    hideFieldError(usernameInput, usernameError);
    hideFieldError(passwordInput, passwordError);
  }

  // ================================================
  // UI: Toggle Password Visibility
  // ================================================
  function togglePasswordVisibility() {
    try {
      const isPassword = passwordInput.type === 'password';
      passwordInput.type = isPassword ? 'text' : 'password';
      if (isPassword) {
        eyeIcon.style.display = 'none';
        eyeOffIcon.style.display = 'block';
      } else {
        eyeIcon.style.display = 'block';
        eyeOffIcon.style.display = 'none';
      }
      // 强制重绘防止布局错位
      togglePasswordBtn.offsetHeight;
    } catch (e) {
      console.error('Error toggling password visibility:', e);
    }
  }

  // ================================================
  // UI: Button Loading State
  // ================================================
  function setButtonLoading(isLoading) {
    loginButton.classList.toggle('loading', isLoading);
    loginButton.disabled = isLoading;
    buttonText.style.display = isLoading ? 'none' : 'inline';
    buttonSpinner.style.display = isLoading ? 'inline' : 'none';
  }

  // ================================================
  // UI: Update Button State
  // ================================================
  function updateButtonState() {
    const hasUsername = usernameInput.value.trim().length > 0;
    const hasPassword = passwordInput.value.length > 0;
    loginButton.disabled = !hasUsername || !hasPassword;
    // Ensure spinner is hidden when button is in normal state
    if (!loginButton.classList.contains('loading')) {
      buttonSpinner.style.display = 'none';
      buttonText.style.display = 'inline';
    }
  }

  // ================================================
  // Validation: Real-time Input Validation
  // ================================================
  let validationTimeout;
  function debounceValidation(field, value, validator, input, errorSpan) {
    clearTimeout(validationTimeout);
    validationTimeout = setTimeout(() => {
      const result = validator(value);
      if (value && !result.valid) {
        showFieldError(input, errorSpan, result.message);
      } else {
        hideFieldError(input, errorSpan);
      }
      updateButtonState();
    }, VALIDATION_DEBOUNCE_MS);
  }

  // ================================================
  // Configuration - 您可以在这里修改账号密码
  // ================================================
  const VALID_CREDENTIALS = {
    username: 'admin', // 修改这里来更改账号
    password: '123456' // 修改这里来更改密码
  };

  // ================================================
  // Authentication: Simulate Backend API
  // ================================================
  async function simulateLogin(username, password) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Validate credentials - 只有匹配 VALID_CREDENTIALS 中的账号密码才能登录
    const isValid = (
      username.trim().toLowerCase() === VALID_CREDENTIALS.username.toLowerCase() &&
      password === VALID_CREDENTIALS.password
    );

    if (isValid) {
      // Simulate successful authentication with JWT
      return {
        success: true,
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXJpbmZvIiwiaWF0IjoxNzE2MjYwMDAwLCJleHAiOjE3MTYzNDY0MDB9.example_token',
        user: {
          username: sanitizeInput(username),
          email: sanitizeInput(username),
          name: 'ULVAC User'
        }
      };
    } else {
      throw new Error('Invalid credentials');
    }
  }

  // ================================================
  // Authentication: Real API Call (for production)
  // ================================================
  async function loginWithAPI(username, password, csrfToken) {
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfToken,
      },
      body: JSON.stringify({
        username: sanitizeInput(username),
        password: password // Never log or expose passwords
      }),
      credentials: 'same-site',
    });

    if (!response.ok) {
      throw new Error('Authentication failed');
    }

    return response.json();
  }

  // ================================================
  // Session Management
  // ================================================
  function setAuthToken(token, rememberMe) {
    if (rememberMe) {
      localStorage.setItem(TOKEN_KEY, token);
    } else {
      sessionStorage.setItem(TOKEN_KEY, token);
    }
  }

  function getAuthToken() {
    return localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY);
  }

  function isAuthenticated() {
    return !!getAuthToken();
  }

  function setRememberMePreference(username) {
    if (username) {
      localStorage.setItem(REMEMBER_ME_KEY, JSON.stringify({
        username: sanitizeInput(username),
        rememberMe: true
      }));
    } else {
      localStorage.removeItem(REMEMBER_ME_KEY);
    }
  }

  function getRememberMePreference() {
    const data = localStorage.getItem(REMEMBER_ME_KEY);
    return data ? JSON.parse(data) : null;
  }

  // ================================================
  // Form Submission Handler
  // ================================================
  async function handleFormSubmit(e) {
    e.preventDefault();
    clearAllErrors();

    const username = usernameInput.value;
    const password = passwordInput.value;
    const rememberMe = rememberMeCheckbox.checked;
    const csrfToken = csrfTokenInput.value;

    // Validate inputs
    const usernameValidation = validateUsername(username);
    const passwordValidation = validatePassword(password);

    let hasError = false;

    if (!usernameValidation.valid) {
      showFieldError(usernameInput, usernameError, usernameValidation.message);
      hasError = true;
    }

    if (!passwordValidation.valid) {
      showFieldError(passwordInput, passwordError, passwordValidation.message);
      hasError = true;
    }

    if (hasError) {
      return;
    }

    // Start loading
    setButtonLoading(true);

    try {
      // For demo, use simulation. In production, use loginWithAPI()
      const result = await simulateLogin(username, password);

      if (result.success) {
        // Store authentication token
        setAuthToken(result.token, rememberMe);

        // Remember username if selected
        if (rememberMe) {
          setRememberMePreference(username);
        } else {
          setRememberMePreference(null);
        }

        // Redirect to homepage or dashboard
        showRedirectAnimation();
        setTimeout(() => {
          window.location.href = 'index.html';
        }, 800);
      }
    } catch (error) {
      console.error('Login error:', error);
      // Don't reveal specific error for security
      showGeneralError('Invalid username or password. Please try again.');
    } finally {
      setButtonLoading(false);
    }
  }

  // ================================================
  // UI: Redirect Animation
  // ================================================
  function showRedirectAnimation() {
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, #0D5895 0%, #1164A7 50%, #4DA8F5 100%);
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
      animation: fadeIn 0.3s ease;
    `;
    overlay.innerHTML = `
      <style>
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes pulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.05); } }
      </style>
      <div style="text-align: center; color: white; animation: pulse 1s ease infinite;">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-bottom: 16px;">
          <path d="M20 6L9 17L4 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <p style="font-size: 18px; font-weight: 600;">Welcome back!</p>
        <p style="font-size: 14px; opacity: 0.8; margin-top: 4px;">Redirecting...</p>
      </div>
    `;
    document.body.appendChild(overlay);
  }

  // ================================================
  // Initialization
  // ================================================
  function init() {
    // Set initial eye icon states
    eyeIcon.style.display = 'block';
    eyeOffIcon.style.display = 'none';
    
    // Set initial button state
    buttonText.style.display = 'inline';
    buttonSpinner.style.display = 'none';
    
    // Hide all errors initially
    clearAllErrors();

    // Check if already authenticated
    if (isAuthenticated()) {
      window.location.href = 'index.html';
      return;
    }

    // Set CSRF token
    csrfTokenInput.value = generateCSRFToken();

    // Check remember me preference
    const rememberMePref = getRememberMePreference();
    if (rememberMePref && rememberMePref.username) {
      usernameInput.value = rememberMePref.username;
      rememberMeCheckbox.checked = true;
      updateButtonState();
    }

    // Event Listeners
    loginForm.addEventListener('submit', handleFormSubmit);
    togglePasswordBtn.addEventListener('click', togglePasswordVisibility);

    // Update button state on input
    usernameInput.addEventListener('input', updateButtonState);
    passwordInput.addEventListener('input', updateButtonState);

    // Clear errors on focus
    usernameInput.addEventListener('focus', () => {
      hideFieldError(usernameInput, usernameError);
      hideGeneralError();
    });
    passwordInput.addEventListener('focus', () => {
      hideFieldError(passwordInput, passwordError);
      hideGeneralError();
    });
  }

  // ================================================
  // Security: Add Page Visibility Check (for security)
  // ================================================
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      // Optional: Clear sensitive data from memory if needed
    }
  });

  // ================================================
  // Run on DOM Ready
  // ================================================
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
