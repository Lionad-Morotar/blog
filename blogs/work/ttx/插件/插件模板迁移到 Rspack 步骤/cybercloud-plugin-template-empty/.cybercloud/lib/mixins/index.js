import routerMixin from "./router";
import fetchMixin from "./fetch";
import envMixin from "./env";
import utilsMixin from "./utils";

export function install(Ctor, config) {
  Ctor.prototype.config = config;
  envMixin(Ctor);
  routerMixin(Ctor);
  fetchMixin(Ctor);
  utilsMixin(Ctor);
}
