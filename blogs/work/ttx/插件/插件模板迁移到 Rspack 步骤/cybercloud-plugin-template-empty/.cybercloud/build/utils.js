module.exports = {
  isProd: () => process.env.NODE_ENV === "production",
  isDev: () => process.env.NODE_ENV === "development",
};
