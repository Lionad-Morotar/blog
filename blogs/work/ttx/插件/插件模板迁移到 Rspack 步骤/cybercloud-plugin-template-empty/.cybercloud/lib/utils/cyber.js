import config from "./config";

import Ctor from "@cybercloud/ui/cyber-lib";

const cyberLibrary = new Ctor({
  request: config.fetch,
});

cyberLibrary.definePlugin(
  "request",
  (request) => {
    request.addHook("responseInterceptor", (response) => {
      if (response.status === 200) {
        if (response.data.code !== "0" && response.data.code !== 0) {
          return { CYBER_REQUEST_HOOK_BREAK: true, data: Promise.reject(response.data) };
        }
        return response.data.data || response.data;
      } else return Promise.reject(response);
    });
  },
  false
);

cyberLibrary.setup();

export const http = cyberLibrary.request;

export const request = http.fetch.bind(http);
