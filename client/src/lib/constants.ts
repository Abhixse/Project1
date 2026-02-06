/**
 * Constants used throughout the application
 */

export const APP_NAME = "MERN App";

export const ROUTES = {
  HOME: "/",
  ABOUT: "/about",
  SERVICES: "/services",
  CLIENTS: "/clients",
  GALLERY: "/gallery",
  CONTACT: "/contact",
} as const;

export const BREAKPOINTS = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

export const ANIMATION_DURATION = {
  fast: 150,
  normal: 300,
  slow: 500,
} as const;

export const QUERY_KEYS = {
  users: "users",
  products: "products",
  services: "services",
  // Add more query keys as needed
} as const;
