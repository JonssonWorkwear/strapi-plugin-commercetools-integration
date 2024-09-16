import { client } from './commercetools/client';

const { CT_DEFAULT_LOCALE = 'en-ZA' } = process.env;

export default () => ({
  getAllProducts(queryArgs: any = {}) {
    return client
      .productProjections()
      .get({
        queryArgs,
      })
      .execute();
  },

  searchProducts(queryArgs: any = {}) {
    return client.productProjections().search().get({ queryArgs }).execute();
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

  getProductBySku(sku: string) {
    return client
      .productProjections()
      .get({
        queryArgs: {
          where: `variants(sku="${sku}")`
        }
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
