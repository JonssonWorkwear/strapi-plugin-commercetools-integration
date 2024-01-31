import { Strapi } from '@strapi/strapi';

const { CT_DEFAULT_LOCALE = 'en-ZA', CT_PLACEHOLDER_IMG_URL } = process.env;

export default ({ strapi }: { strapi: Strapi }) => ({
  async getAllProducts(ctx) {
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
        image: product.masterVariant.images[0]
          ? product.masterVariant.images[0].url
          : CT_PLACEHOLDER_IMG_URL,
        price: product.masterVariant.prices[0]
          ? product.masterVariant.prices[0].value.centAmount
          : 0,
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
      image: productData.masterVariant.images[0]
        ? productData.masterVariant.images[0].url
        : CT_PLACEHOLDER_IMG_URL,
      price: productData.masterVariant.prices[0]
        ? productData.masterVariant.prices[0].value.centAmount
        : 0,
    };
  },
});
