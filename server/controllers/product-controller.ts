import { Strapi } from '@strapi/strapi';

const { CT_DEFAULT_LOCALE = 'en-ZA' } = process.env;

export default ({ strapi }: { strapi: Strapi }) => ({
  async getAllProducts(ctx) {
    console.log('controller!');

    const products = await strapi
      .plugin('commercetools')
      .service('productService')
      .getAllProducts();

    // Filter down only the necessary fields
    // Throw errors are picked up by the client as 500
    const productsData = products.body.results.map((product) => {
      return {
        title: product.name[CT_DEFAULT_LOCALE],
        description: product.description?.[CT_DEFAULT_LOCALE],
        slug: product.slug?.[CT_DEFAULT_LOCALE],
        image: product.masterVariant.images?.[0].url,
        price: product.masterVariant.prices?.[0].value.centAmount,
      };
    });

    ctx.body = productsData;
  },

  async getProductBySlug(ctx) {
    const product = await strapi
      .plugin('commercetools')
      .service('productService')
      .getProductBySlug(ctx.params.id);

    const productData = product.body.results[0];

    if (!productData) {
      return {};
    }

    // Filter down only the necessary fields
    // Throw errors are picked up by the client as 500
    return {
      title: productData.name[CT_DEFAULT_LOCALE],
      description: productData.description?.[CT_DEFAULT_LOCALE],
      slug: productData.slug?.[CT_DEFAULT_LOCALE],
      image: productData.masterVariant.images?.[0].url,
      price: productData.masterVariant.prices?.[0].value.centAmount,
    };
  },
});
