import phpConfigGenerator from './php-config-generator';

describe('phpConfigGenerator', () => {
  it('should generate a PHP config file from a given path', () => {
    const path = 'src/config.php';
    const result = phpConfigGenerator.generator(path);

    expect(result.content).toBeDefined();
    expect(result.type).toBe('text/plain');
    // We can't use a simple snapshot because the seed is based on the path hash.
    // Instead, we check for the general structure.
    expect(result.content).toMatch(/^<\?php/);
    expect(result.content).toContain("define('APP_NAME', ");
    expect(result.content).toContain("define('API_KEY', ");
  });

  it('should produce consistent output for the same path', () => {
    const path = 'api/v1/config.php';
    const result1 = phpConfigGenerator.generator(path);
    const result2 = phpConfigGenerator.generator(path);
    expect(result1.content).toEqual(result2.content);
  });

  it('should produce different output for different paths', () => {
    const path1 = 'project-a/config.php';
    const path2 = 'project-b/config.php';
    const result1 = phpConfigGenerator.generator(path1);
    const result2 = phpConfigGenerator.generator(path2);
    expect(result1.content).not.toEqual(result2.content);
  });
});
