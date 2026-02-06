/**
 * Security utilities for the application
 * Implements OWASP security best practices
 */

/**
 * Sanitizes user input to prevent XSS attacks
 * @param input - User input string
 * @returns Sanitized string safe for DOM insertion
 */
export const sanitizeInput = (input: string): string => {
  const div = document.createElement("div");
  div.textContent = input;
  return div.innerHTML;
};

/**
 * Validates and sanitizes URLs to prevent injection attacks
 * @param url - URL to validate
 * @param allowedProtocols - Array of allowed protocols (default: ['https', 'http', 'mailto'])
 * @returns Sanitized URL or null if invalid
 */
export const sanitizeUrl = (
  url: string,
  allowedProtocols: string[] = ["https", "http", "mailto"]
): string | null => {
  try {
    const urlObj = new URL(url);
    const protocol = urlObj.protocol.slice(0, -1); // Remove trailing ':'

    if (allowedProtocols.includes(protocol)) {
      return url;
    }
  } catch {
    // Invalid URL format
    return null;
  }
  return null;
};

/**
 * Validates email addresses
 * @param email - Email to validate
 * @returns True if valid, false otherwise
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
};

/**
 * Prevents CSRF attacks by validating origin
 * @param expectedOrigin - Expected origin domain
 * @returns True if origin is valid, false otherwise
 */
export const validateOrigin = (expectedOrigin: string): boolean => {
  const origin = window.location.origin;
  return origin === expectedOrigin;
};

/**
 * Generates a secure random token for CSRF protection
 * @param length - Token length (default: 32)
 * @returns Random token string
 */
export const generateCSRFToken = (length: number = 32): string => {
  const charset =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let token = "";
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);

  for (let i = 0; i < length; i++) {
    token += charset[array[i] % charset.length];
  }
  return token;
};

/**
 * Checks if the application is running in a secure context (HTTPS)
 * @returns True if secure, false otherwise
 */
export const isSecureContext = (): boolean => {
  return (
    window.isSecureContext ||
    window.location.protocol === "https:" ||
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1"
  );
};

/**
 * Logs security events (should be implemented with proper logging service)
 * @param event - Security event description
 * @param severity - Event severity level
 */
export const logSecurityEvent = (
  event: string,
  severity: "low" | "medium" | "high" | "critical" = "medium"
): void => {
  const timestamp = new Date().toISOString();
  const message = `[${timestamp}] Security Event (${severity}): ${event}`;

  // In production, send to logging service
  if (process.env.NODE_ENV === "development") {
    console.warn(message);
  } else {
    // Send to monitoring service
    // Example: sendToMonitoring({ event, severity, timestamp })
  }
};

/**
 * Content Security Policy helper
 * Returns recommended CSP headers for the application
 */
export const getCSPHeaders = (): Record<string, string> => {
  return {
    "default-src": "'self'",
    "script-src": "'self' 'wasm-unsafe-eval'",
    "style-src": "'self' 'unsafe-inline'",
    "img-src": "'self' data: https:",
    "font-src": "'self' data:",
    "connect-src": "'self' https:",
    "frame-ancestors": "'none'",
    "base-uri": "'self'",
    "form-action": "'self'",
  };
};

/**
 * Permission Policy helper
 * Returns recommended Permissions-Policy headers
 */
export const getPermissionsPolicyHeaders = (): Record<string, string> => {
  return {
    camera: "=()",
    microphone: "=()",
    geolocation: "=()",
    payment: "=()",
    accelerometer: "=()",
    gyroscope: "=()",
    magnetometer: "=()",
    usb: "=()",
  };
};

/**
 * Initializes security checks on app load
 */
export const initSecurityChecks = (): void => {
  // Check for secure context
  if (!isSecureContext() && process.env.NODE_ENV === "production") {
    logSecurityEvent(
      "Application running in non-secure context",
      "high"
    );
  }

  // Disable console in production
  if (process.env.NODE_ENV === "production") {
    if (typeof window !== "undefined") {
      (window as any).console = {
        log: () => {},
        warn: () => {},
        error: () => {},
        info: () => {},
      };
    }
  }

  // Prevent clickjacking
  if (window.self !== window.top) {
    logSecurityEvent("Clickjacking attempt detected", "critical");
    window.top!.location = window.self.location;
  }
};
