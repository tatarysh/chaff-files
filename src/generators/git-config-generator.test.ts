import gitConfigGenerator from './git-config-generator';

describe('gitConfigGenerator', () => {
  it('should generate valid .git/config file content', () => {
    const content = gitConfigGenerator.generator('');
    expect(content).toBeDefined();
    expect(content.type).toBe('text/plain');
    expect(content.content).toContain('[core]');
    expect(content.content).toContain('repositoryformatversion');
    expect(content.content).toContain('filemode');
    expect(content.content).toContain('bare');
  });
});
