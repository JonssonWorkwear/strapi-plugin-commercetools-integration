import { Strapi } from '@strapi/strapi';

const { CT_DEFAULT_LOCALE = 'en-ZA' } = process.env;

export default ({ strapi }: { strapi: Strapi }) => ({
  async getAllCategories(ctx) {
    const categories = await strapi
      .plugin('commercetools')
      .service('categoryService')
      .getAllCategories();

    // Filter down only the necessary fields
    // Throw errors are picked up by the client as 500
    const categoriesData = categories.body.results.map((category) => {
      return {
        name: category.name[CT_DEFAULT_LOCALE],
        slug: category.slug?.[CT_DEFAULT_LOCALE],
      };
    });

    ctx.body = categoriesData;
  },
});
