import { ChaffResponse, Generator } from '../types/index';
import { PRNG, simpleHash } from '../utils/prng-utils';

const generatePhpConfigContent = (prng: PRNG): string => {
  const appName = prng.nextString(12);
  const appEnv = prng.nextChoice(['development', 'staging', 'production']);
  const apiUrl = `https://${prng.nextString(8)}.example.com/api`;
  const apiKey = prng.nextString(32);

  return `<?php
/**
 * General Application Configuration
 *
 * This file is auto-generated.
 */

// Application Settings
define('APP_NAME', '${appName}');
define('APP_ENV', '${appEnv}');
define('APP_DEBUG', ${prng.next() > 0.5 ? 'true' : 'false'});

// API Credentials
define('API_URL', '${apiUrl}');
define('API_KEY', '${apiKey}');

// Feature Flags
define('FEATURE_ENABLE_NEW_DASHBOARD', ${prng.next() > 0.7 ? 'true' : 'false'});
define('FEATURE_ENABLE_BETA_ACCESS', ${prng.next() > 0.9 ? 'true' : 'false'});

/* That's all, stop editing! */
`;
};

const phpConfigGenerator: Generator = {
  pattern: /(^|\/)[^/]+\\.php$/,
  generator: (path: string): ChaffResponse => {
    const seed = simpleHash(path);
    const prng = new PRNG(seed);
    const content = generatePhpConfigContent(prng);
    return { content, type: 'text/plain' };
  },
};

export default phpConfigGenerator;
