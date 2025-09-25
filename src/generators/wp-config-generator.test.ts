import wpConfigGenerator from './wp-config-generator';

describe('wpConfigGenerator', () => {
  it('should generate valid wp-config.php file content', () => {
    const content = wpConfigGenerator.generator('');
    expect(content).toBeDefined();
    expect(content.type).toBe('text/plain');
    expect(content.content).toContain('DB_NAME');
    expect(content.content).toContain('DB_USER');
    expect(content.content).toContain('DB_PASSWORD');
    expect(content.content).toContain('DB_HOST');
  });
});
