function convertHrefSearch(url) {
  const i = url.lastIndexOf("?");
  if (i === -1) return {};
  const searchString = url.substr(i + 1);
  const q = searchString.split("&");
  const r = {};
  q.forEach((item) => {
    const arr = item.split("=");
    r[arr[0]] = arr[1];
  });
  return r;
}

export default function utilsMixin(Ctor) {
  Ctor.prototype.convertHrefSearch = convertHrefSearch;
}
