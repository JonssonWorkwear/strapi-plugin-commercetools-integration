"use strict";

module.exports = ({ strapi }) => {
  strapi.customFields.register({
    name: "ProductGrid",
    plugin: "strapi-plugin-commercetools-integration",
    type: "text",
  });
};
