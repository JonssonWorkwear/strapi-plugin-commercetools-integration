import { client } from './commercetools/client';

const { CT_DEFAULT_LOCALE = 'en-ZA' } = process.env;

export default () => ({
  async getAllCategories() {
    return client.categories().get().execute();
  },

  async getCategoryById(id: string) {
    return client.categories().withId({ ID: id }).get().execute();
  },

  async getCategoryBySlug(slug: string) {
    return client
      .categories()
      .get({
        queryArgs: {
          where: `slug(${CT_DEFAULT_LOCALE}="${slug}")`,
        },
      })
      .execute();
  },
});
