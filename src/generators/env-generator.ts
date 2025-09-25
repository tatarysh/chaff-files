
import { ChaffResponse, Generator } from "../types/index";
import { PRNG, simpleHash } from "../utils/prng-utils";

const generateEnvContent = (prng: PRNG): string => {
  const sections = {
    DATABASE: () => `
# Database Credentials
DB_CONNECTION=mysql
DB_HOST=10.0.${prng.nextInt(0, 255)}.${prng.nextInt(0, 255)}
DB_PORT=3306
DB_DATABASE=prod_${prng.nextString(8)}
DB_USERNAME=user_${prng.nextString(10)}
DB_PASSWORD=${prng.nextString(20)}
`,
    API_KEYS: () => `
# API Keys
STRIPE_SECRET_KEY=sk_live_${prng.nextString(24)}
SENDGRID_API_KEY=SG.${prng.nextString(22)}.${prng.nextString(43)}
GOOGLE_MAPS_API_KEY=AIzaSy${prng.nextString(33)}
`,
    AWS: () => `
# AWS Credentials
AWS_ACCESS_KEY_ID=AKIA${prng.nextString(16).toUpperCase()}
AWS_SECRET_ACCESS_KEY=${prng.nextString(40)}
AWS_DEFAULT_REGION=us-east-1
AWS_BUCKET=bucket-${prng.nextString(12)}
`,
    JWT: () => `
# JWT Secret
JWT_SECRET=${prng.nextString(64)}
`,
    SOCIAL: () => `
# Social App Credentials
FACEBOOK_CLIENT_ID=${prng.nextString(16)}
FACEBOOK_CLIENT_SECRET=${prng.nextString(32)}
GOOGLE_CLIENT_ID=${prng.nextString(20)}.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-${prng.nextString(24)}
`,
  };

  const part1 = prng.nextString(prng.nextInt(3, 6));
  const part2 = prng.nextString(prng.nextInt(4, 8));
  const appName = part1.charAt(0).toUpperCase() + part1.slice(1) + part2.charAt(0).toUpperCase() + part2.slice(1);

  let content = `APP_NAME=${appName}
APP_ENV=production
APP_KEY=base64:${Buffer.from(prng.nextString(32)).toString('base64')}
APP_DEBUG=false
`;

  const sectionKeys = Object.keys(sections) as (keyof typeof sections)[];
  // Randomly include sections
  for (const key of sectionKeys) {
    if (prng.next() > 0.5) { // 50% chance to include each section
      content += sections[key]();
    }
  }

  return content;
};

const envGenerator: Generator = {
  pattern: /(^|\/)\.env(\..*)?$/,
  generator: (path: string): ChaffResponse => {
    const seed = simpleHash(path);
    const prng = new PRNG(seed);
    const envContent = generateEnvContent(prng);
    return { content: envContent, type: 'text' };
  },
};

export default envGenerator;
