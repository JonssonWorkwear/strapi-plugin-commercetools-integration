import { Strapi } from '@strapi/strapi';

export default ({ strapi }: { strapi: Strapi }) => ({
  async getAllProducts(ctx) {
    ctx.body = await strapi.plugin('commercetools').service('productService').getAllProducts();
  },

  async getProductBySlug(ctx) {
    ctx.body = await strapi
      .plugin('commercetools')
      .service('productService')
      .getProductBySlug(ctx.params.id);
  },
});
