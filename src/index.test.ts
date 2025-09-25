import { generateChaffResponse } from '../src/index';

describe('generateChaffResponse', () => {
  it('should return null if no pattern matches', () => {
    const response = generateChaffResponse('/non-existent-path');
    expect(response).toBeNull();
  });

  // Add more tests here for specific generator patterns
  it('should return a ChaffResponse for a matching pattern (e.g., .env)', () => {
    const response = generateChaffResponse('/.env');
    expect(response).not.toBeNull();
    expect(response?.type).toBe('text/plain');
    expect(response?.content).toContain('APP_NAME');
  });

  it('should return a ChaffResponse for a matching pattern (e.g., .git/config)', () => {
    const response = generateChaffResponse('/.git/config');
    expect(response).not.toBeNull();
    expect(response?.type).toBe('text/plain');
    expect(response?.content).toContain('[core]');
  });

  it('should return a ChaffResponse for a matching pattern (e.g., .ssh/id_rsa)', () => {
    const response = generateChaffResponse('/.ssh/id_rsa');
    expect(response).not.toBeNull();
    expect(response?.type).toBe('text/plain');
    expect(response?.content).toContain('-----BEGIN RSA PRIVATE KEY-----');
  });

  it('should return a ChaffResponse for a matching pattern (e.g., wp-config.php)', () => {
    const response = generateChaffResponse('/wp-config.php');
    expect(response).not.toBeNull();
    expect(response?.type).toBe('text/plain');
    expect(response?.content).toContain('DB_NAME');
  });
});
