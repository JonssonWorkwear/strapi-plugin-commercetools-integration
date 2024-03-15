import { Strapi } from '@strapi/strapi';

import { ClientResponse, ProductProjectionPagedQueryResponse } from '@commercetools/platform-sdk';

const { CT_DEFAULT_LOCALE = 'en-ZA', CT_PLACEHOLDER_IMG_URL } = process.env;

export default ({ strapi }: { strapi: Strapi }) => ({
  async getAllProducts(ctx) {
    const { page = 1, search = '' } = ctx.request.query;

    const products = (await strapi
      .plugin('commercetools')
      .service('productService')
      .searchProducts({
        page: page,
        fuzzy: true,
        [`text.${CT_DEFAULT_LOCALE}`]: search,
      })) as ClientResponse<ProductProjectionPagedQueryResponse>;

    // Filter down only the necessary fields
    // Throw errors are picked up by the client as 500
    const productsData = products.body.results.map((product) => {
      return {
        title: product.name[CT_DEFAULT_LOCALE],
        description: product.description?.[CT_DEFAULT_LOCALE],
        slug: product.slug?.[CT_DEFAULT_LOCALE],
        image: product.masterVariant.images
          ? product.masterVariant.images[0]
            ? product.masterVariant.images[0].url
            : CT_PLACEHOLDER_IMG_URL
          : CT_PLACEHOLDER_IMG_URL,
        price: product.masterVariant.prices
          ? product.masterVariant.prices[0]
            ? product.masterVariant.prices[0].value.centAmount
            : 0
          : 0,
      };
    });

    ctx.body = {
      pagination: {
        total: products.body.total,
        count: products.body.count,
        offset: products.body.offset,
        limit: products.body.limit,
      },
      results: productsData,
    };
  },

  async getProductBySlug(ctx) {
    const product = (await strapi
      .plugin('commercetools')
      .service('productService')
      .getProductBySlug(ctx.params.id)) as ClientResponse<ProductProjectionPagedQueryResponse>;

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
      image: productData.masterVariant.images
        ? productData.masterVariant.images[0]
          ? productData.masterVariant.images[0].url
          : CT_PLACEHOLDER_IMG_URL
        : CT_PLACEHOLDER_IMG_URL,
      price: productData.masterVariant.prices
        ? productData.masterVariant.prices[0]
          ? productData.masterVariant.prices[0].value.centAmount
          : 0
        : 0,
    };
  },
});
