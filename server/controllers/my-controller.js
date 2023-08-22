"use strict";

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin("strapi-plugin-commercetools-integration")
      .service("myService")
      .getWelcomeMessage();
  },
});
