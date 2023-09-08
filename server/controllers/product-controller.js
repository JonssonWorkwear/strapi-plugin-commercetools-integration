'use strict';

module.exports = ({ strapi }) => ({
  async getAllProducts(ctx) {
    ctx.body = await strapi.plugin('commercetools').service('productService').getAllProducts();
  },
});
