/**
 * Environment configuration with type safety
 */
export const env = {
  apiUrl: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
  appName: import.meta.env.VITE_APP_NAME || "MERN App",
  appVersion: import.meta.env.VITE_APP_VERSION || "1.0.0",
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
  mode: import.meta.env.MODE,
} as const;

// Validate required environment variables
const requiredEnvVars = ["VITE_API_URL"] as const;

export function validateEnv(): void {
  const missing = requiredEnvVars.filter(
    (key) => !import.meta.env[key]
  );

  if (missing.length > 0 && import.meta.env.PROD) {
    console.warn(
      `Missing environment variables: ${missing.join(", ")}`
    );
  }
}
