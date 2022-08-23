const withTM = require("next-transpile-modules")(["ui"]);

module.exports = withTM({
  images: {
    domains: ["via.placeholder.com"],
  },
  reactStrictMode: true,
});
