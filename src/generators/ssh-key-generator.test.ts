import sshKeyGenerator from './ssh-key-generator';

describe('sshKeyGenerator', () => {
  it('should generate valid SSH private key content', () => {
    const content = sshKeyGenerator.generator('');
    expect(content).toBeDefined();
    expect(content.type).toBe('text/plain');
    expect(content.content).toContain('-----BEGIN RSA PRIVATE KEY-----');
    expect(content.content).toContain('-----END RSA PRIVATE KEY-----');
  });
});
