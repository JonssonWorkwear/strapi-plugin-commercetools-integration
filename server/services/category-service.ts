import { Strapi } from '@strapi/strapi';

import { client } from './commercetools/client';

const { CT_DEFAULT_LOCALE = 'en-ZA' } = process.env;

export default ({ strapi }: { strapi: Strapi }) => ({
  async getAllCategories() {
    const categoriesData = await client.categories().get().execute();

    const categories = categoriesData.body.results.map((category) => {
      return {
        name: category.name[CT_DEFAULT_LOCALE],
        slug: category.slug?.[CT_DEFAULT_LOCALE],
      };
    });

    return categories;
  },
});
