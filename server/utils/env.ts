/**
 * [local], [dev], or [prod] prefix for log statements and email subjects in non-production environments
 * @param text the text to prepend an environment
 * @returns text prepended with [env] if not in production, otherwise returns text unchanged
 */
export function prependEnv(text: string): string {
  return isProd() ? text : `[${envAbbr()}] ${text}`;
}

/**
 * @returns the abbreviated environment name
 */
export function envAbbr(): string {
  switch (useRuntimeConfig().nodeEnv) {
    case "local":
      return "local";
    case "development":
      return "dev";
    default:
      return "";
  }
}

/**
 * @returns true if the environment is "production"
 */
export function isProd(): boolean {
  return useRuntimeConfig().nodeEnv === "production";
}

/**
 * @returns true if the environment is "development"
 */
export function isDev(): boolean {
  return useRuntimeConfig().nodeEnv === "development";
}

/**
 * @returns true if the environment is "local"
 */
export function isLocal(): boolean {
  return useRuntimeConfig().nodeEnv === "local";
}
