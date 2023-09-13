import { Strapi } from '@strapi/strapi';

export default ({ strapi }: { strapi: Strapi }) => ({
  async getAllProducts(ctx) {
    ctx.body = await strapi.plugin('commercetools').service('productService').getAllProducts();
  },

  async getProductById(ctx) {
    ctx.body = await strapi
      .plugin('commercetools')
      .service('productService')
      .getProductById(ctx.params.id);
  },
});
