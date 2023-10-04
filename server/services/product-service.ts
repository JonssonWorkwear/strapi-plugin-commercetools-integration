import { Strapi } from '@strapi/strapi';

import { client } from './commercetools/client';

const { CT_DEFAULT_LOCALE = 'en-ZA' } = process.env;

export default ({ strapi }: { strapi: Strapi }) => ({
  async getAllProducts() {
    const products = await client.productProjections().get().execute();

    const productsData = products.body.results.map((product) => {
      // TODO: WIP validation
      const name = product.name[CT_DEFAULT_LOCALE];
      const description = product.description?.[CT_DEFAULT_LOCALE];
      const slug = product.slug?.[CT_DEFAULT_LOCALE];
      const image = product.masterVariant.images?.[0].url;
      const price = product.masterVariant.prices?.[0].value.centAmount;

      return {
        title: name,
        description,
        id: slug,
        image,
        price,
      };
    });

    return productsData;
  },

  async getProductById(id: string) {
    const product = await client
      .productProjections()
      .get({
        queryArgs: {
          where: `slug(${CT_DEFAULT_LOCALE}="${id}")`,
        },
      })
      .execute();

    // TODO: WIP validation
    const productData = product.body.results[0];

    if (!productData) {
      return {};
    }

    // TODO: WIP validation
    const name = productData.name[CT_DEFAULT_LOCALE];
    const description = productData.description?.[CT_DEFAULT_LOCALE];
    const slug = productData.slug?.[CT_DEFAULT_LOCALE];
    const image = productData.masterVariant.images?.[0].url;
    const price = productData.masterVariant.prices?.[0].value.centAmount;

    return {
      title: name,
      description,
      id: slug,
      image,
      price,
    };
  },
});
