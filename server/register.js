"use strict";

module.exports = ({ strapi }) => {
  strapi.customFields.register({
    name: "ProductGrid",
    plugin: "commercetools",
    type: "text",
  });
};
