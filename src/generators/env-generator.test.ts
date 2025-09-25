import envGenerator from './env-generator';

describe('envGenerator', () => {
  it('should generate a valid .env file content', () => {
    const content = envGenerator.generator('');
    expect(content).toBeDefined();
    expect(content.type).toBe('text/plain');
    expect(content.content).toContain('DB_HOST');
    expect(content.content).toContain('DB_USER');
    expect(content.content).toContain('DB_PASS');
    expect(content.content).toContain('APP_KEY');
  });
});
