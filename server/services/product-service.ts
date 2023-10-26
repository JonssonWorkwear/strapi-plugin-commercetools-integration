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
        slug,
        image,
        price,
      };
    });

    return productsData;
  },

  async getProductBySlug(slug: string) {
    const product = await client
      .productProjections()
      .get({
        queryArgs: {
          where: `slug(${CT_DEFAULT_LOCALE}="${slug}")`,
        },
      })
      .execute();

    // TODO: WIP validation
    const productData = product.body.results[0];

    if (!productData) {
      return {};
    }

    return {
      title: productData.name[CT_DEFAULT_LOCALE],
      description: productData.description?.[CT_DEFAULT_LOCALE],
      slug: productData.slug?.[CT_DEFAULT_LOCALE],
      image: productData.masterVariant.images?.[0].url,
      price: productData.masterVariant.prices?.[0].value.centAmount,
    };
  },
});
