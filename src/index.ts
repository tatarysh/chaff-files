import generators from './generators/index';
import { ChaffResponse } from './types/index';

/**
 * Generates a fake hacker response.
 * This is the main function of the chaff-files package.
 *
 * @param requestPath - The request path that triggered the response.
 * @returns A ChaffResponse object containing the content and type.
 */
export function generateChaffResponse(requestPath: string): ChaffResponse | null {
  const lowerCasePath = requestPath.toLowerCase();
  for (const { pattern, generator } of generators) {
    if (pattern.test(lowerCasePath)) {
      return generator(lowerCasePath);
    }
  }

  return null;
}
