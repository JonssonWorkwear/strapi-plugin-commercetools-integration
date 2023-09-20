import { Strapi } from '@strapi/strapi';

import { DUMMY_DATA as data } from './data';

import { client } from './commercetools/client';

export default ({ strapi }: { strapi: Strapi }) => ({
  async getAllProducts() {
    const products = await client.products().get().execute();

    const productsData = products.body.results.map((product) => {
      const name = product.masterData.current.name['en-ZA'];
      const description = product.masterData.current.description?.['en-ZA'];
      const sku = product.key;
      const image = product.masterData.current.masterVariant.images?.[0].url;
      const price = product.masterData.current.masterVariant.prices?.[0].value.centAmount;

      return {
        title: name,
        description,
        id: sku,
        image,
        price,
      };
    });

    return productsData;
  },

  async getProductById(id: string) {
    const product = await client.products().withKey({ key: id }).get().execute();
    console.log(product);

    const name = product.body.masterData.current.name['en-ZA'];
    const description = product.body.masterData.current.description?.['en-ZA'];
    const sku = product.body.key;
    const image = product.body.masterData.current.masterVariant.images?.[0].url;
    const price = product.body.masterData.current.masterVariant.prices?.[0].value.centAmount;

    return {
      title: name,
      description,
      id: sku,
      image,
      price,
    };

    return data.find((product) => product.id === id);
  },
});
