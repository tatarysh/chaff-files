import { ChaffResponse, Generator } from '../types/index';
import { PRNG, simpleHash } from '../utils/prng-utils';

const generateWpConfigContent = (prng: PRNG): string => {
  const dbName = `wp_${prng.nextString(8)}`;
  const dbUser = `user_${prng.nextString(10)}`;
  const dbPassword = prng.nextString(20);
  const dbHost = `10.0.${prng.nextInt(0, 255)}.${prng.nextInt(0, 255)}`;

  const authKeys = [
    `AUTH_KEY`,
    `SECURE_AUTH_KEY`,
    `LOGGED_IN_KEY`,
    `NONCE_KEY`,
    `AUTH_SALT`,
    `SECURE_AUTH_SALT`,
    `LOGGED_IN_SALT`,
    `NONCE_SALT`,
  ]
    .map((key) => `define( '${key}',         '${prng.nextString(64)}' );`)
    .join('\n');

  const tablePrefix = `wp_${prng.nextString(3)}_`;

  const wpDebug = prng.next() > 0.5 ? 'true' : 'false';
  const wpDebugLog = prng.next() > 0.5 ? 'true' : 'false';
  const wpDebugDisplay = prng.next() > 0.5 ? 'true' : 'false';
  const displayErrors = prng.next() > 0.5 ? '1' : '0';

  return `<?php
  /**
   * The base configuration for WordPress
   */
  
  // ** MySQL settings - You can get this info from your web host ** //
  define( 'DB_NAME', '${dbName}' );
  define( 'DB_USER', '${dbUser}' );
  define( 'DB_PASSWORD', '${dbPassword}' );
  define( 'DB_HOST', '${dbHost}' );
  define( 'DB_CHARSET', 'utf8' );
  define( 'DB_COLLATE', '' );
  
  /**#@+
   * Authentication Unique Keys and Salts.
   */
  ${authKeys}
  /**#@-*/
  
  /**
   * WordPress Database Table prefix.
   */
  $table_prefix = '${tablePrefix}';
  
  /**
   * For developers: WordPress debugging mode.
   */
  define( 'WP_DEBUG', ${wpDebug} );
  define( 'WP_DEBUG_LOG', ${wpDebugLog} );
  define( 'WP_DEBUG_DISPLAY', ${wpDebugDisplay} );
  @ini_set( 'display_errors', ${displayErrors} );
  
  /* That's all, stop editing! Happy blogging. */
  
  /** Absolute path to the WordPress directory. */
  if ( ! defined( 'ABSPATH' ) ) {
  	define( 'ABSPATH', __DIR__ . '/' );
  }
  
  /** Sets up WordPress vars and included files. */
  require_once ABSPATH . 'wp-settings.php';
  `;
};

const wpConfigGenerator: Generator = {
  pattern: /(^|\/)wp-config\.php$/,
  generator: (path: string): ChaffResponse => {
    const seed = simpleHash(path);
    const prng = new PRNG(seed);
    const wpConfigContent = generateWpConfigContent(prng);
    return { content: wpConfigContent, type: 'text/plain' };
  },
};

export default wpConfigGenerator;
