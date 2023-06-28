import { install as installMixins } from "./mixins";
import config from "./utils/config";

function Cybercloud() {}

installMixins(Cybercloud, config);

const cyber = new Cybercloud();

export default cyber;
