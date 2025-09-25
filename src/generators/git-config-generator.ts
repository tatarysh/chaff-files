
import { ChaffResponse, Generator } from "../types/index";
import { PRNG, simpleHash } from "../utils/prng-utils";

const gitConfigGenerator: Generator = {
  pattern: /(^|\/)\.git\/config$/,
  generator: (path: string): ChaffResponse => {
    const seed = simpleHash(path);
    const prng = new PRNG(seed);

    const userName = prng.nextString(prng.nextInt(5, 10));
    const userEmail = `${prng.nextString(prng.nextInt(5, 8))}@${prng.nextString(prng.nextInt(4, 7))}.com`;
    const repoName = prng.nextString(prng.nextInt(6, 12));
    const remoteUrl = `https://github.com/${userName}/${repoName}.git`;

    const content = `
[core]
	repositoryformatversion = 0
	filemode = true
	bare = false
	logallrefupdates = true
	ignorecase = true
	precomposeunicode = true
[remote "origin"]
	url = ${remoteUrl}
	fetch = +refs/heads/*:refs/remotes/origin/*
[branch "main"]
	remote = origin
	merge = refs/heads/main
[user]
	name = ${userName}
	email = ${userEmail}
`;

    return { content, type: 'text' };
  },
};

export default gitConfigGenerator;
