/**
 * An array of routes that are accessible to the public.
 * These routes are not protected by the authentication middleware.
 * @type {string[]}
 */
export const publicRoutes = ["/", "/auth/new-verification"];

/**
 * An array of routes that are accessible to authenticated users.
 * These routes are protected by the authentication middleware.
 * @type {string[]}
 */
export const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/error",
  "/auth/reset",
  "/auth/new-password"
];

/**
 * The prefix for all API routes.
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path after a successful login.
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/settings";
