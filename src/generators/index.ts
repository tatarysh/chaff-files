
import envGenerator from "./env-generator";
import gitConfigGenerator from "./git-config-generator";
import wpConfigGenerator from "./wp-config-generator";
import { Generator } from "../types/index";

const generators: Generator[] = [
  envGenerator,
  gitConfigGenerator,
  wpConfigGenerator,
  // Future generators will be added here
];

export default generators;
