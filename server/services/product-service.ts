import { client } from './commercetools/client';

const { CT_DEFAULT_LOCALE = 'en-ZA' } = process.env;

export default () => ({
  getAllProducts() {
    return client
      .productProjections()
      .get({
        queryArgs: {
          limit: 100,
        },
      })
      .execute();
  },

  getProductBySlug(slug: string) {
    return client
      .productProjections()
      .get({
        queryArgs: {
          where: `slug(${CT_DEFAULT_LOCALE}="${slug}")`,
        },
      })
      .execute();
  },

  updateProductById(id: string, body: any) {
    return client
      .products()
      .withId({ ID: id })
      .post({
        body,
      })
      .execute();
  },
});
