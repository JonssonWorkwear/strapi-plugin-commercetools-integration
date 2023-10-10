import { Strapi } from '@strapi/strapi';

export default ({ strapi }: { strapi: Strapi }) => ({
  async getAllCategories(ctx) {
    ctx.body = await strapi.plugin('commercetools').service('categoryService').getAllCategories();
  },
});
