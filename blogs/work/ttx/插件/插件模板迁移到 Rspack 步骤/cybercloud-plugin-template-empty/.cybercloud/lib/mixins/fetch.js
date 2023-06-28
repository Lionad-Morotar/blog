/**
 * 网络请求
 * @param {*} Ctor
 */
import { http } from "../utils/cyber";

export default function fetchMixin(Ctor) {
  function request(options) {
    return http.fetch(options);
  }
  Ctor.prototype.request = request;
}
