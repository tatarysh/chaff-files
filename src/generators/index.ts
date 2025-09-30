import envGenerator from './env-generator';
import gitConfigGenerator from './git-config-generator';
import wpConfigGenerator from './wp-config-generator';
import phpConfigGenerator from './php-config-generator';
import sshKeyGenerator from './ssh-key-generator';
import { Generator } from '../types/index';

const generators: Generator[] = [
  envGenerator,
  gitConfigGenerator,
  wpConfigGenerator,
  phpConfigGenerator,
  sshKeyGenerator,
  // Future generators will be added here
];

export default generators;
