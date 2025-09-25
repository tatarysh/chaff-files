import { ChaffResponse, Generator } from '../types/index';
import { PRNG, simpleHash } from '../utils/prng-utils';

const generateSshKeyContent = (prng: PRNG): string => {
  const keyLength = prng.nextInt(2000, 3000); // Simulate variable key length
  const keyContent = prng.nextString(keyLength);
  const email = `${prng.nextString(prng.nextInt(5, 8))}@${prng.nextString(prng.nextInt(4, 7))}.com`;
  const date = new Date(prng.nextInt(2010, 2023), prng.nextInt(0, 11), prng.nextInt(1, 28))
    .toISOString()
    .split('T')[0];

  return `-----BEGIN RSA PRIVATE KEY-----
${keyContent.match(/.{1,64}/g)?.join('\n') || keyContent}
-----END RSA PRIVATE KEY-----
${email} ${date}
`;
};

const sshKeyGenerator: Generator = {
  pattern: /(^|\/)\.ssh\/id_rsa$/,
  generator: (path: string): ChaffResponse => {
    const seed = simpleHash(path);
    const prng = new PRNG(seed);
    const sshKeyContent = generateSshKeyContent(prng);
    return { content: sshKeyContent, type: 'text/plain' };
  },
};

export default sshKeyGenerator;
