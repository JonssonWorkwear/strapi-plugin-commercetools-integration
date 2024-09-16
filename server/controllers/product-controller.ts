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
        offset: (page - 1) * 20,
        fuzzy: true,
        [`text.${CT_DEFAULT_LOCALE}`]: search,
      })) as ClientResponse<ProductProjectionPagedQueryResponse>;

    // Filter down only the necessary fields
    // Throw errors are picked up by the client as 500
    const productsData = products.body.results.map((product) => {
      const image = product.masterVariant.images
              ? product.masterVariant.images[0]
                  ? product.masterVariant.images[0].url
                  : CT_PLACEHOLDER_IMG_URL
              : CT_PLACEHOLDER_IMG_URL;
      const price = product.masterVariant.prices
          ? product.masterVariant.prices[0]
              ? product.masterVariant.prices[0].value.centAmount
              : 0
          : 0;
      return {
        title: product.name[CT_DEFAULT_LOCALE],
        description: product.description?.[CT_DEFAULT_LOCALE],
        slug: product.slug?.[CT_DEFAULT_LOCALE],
        image,
        price,
        variants: product.variants.map((variant) => {
          return {
            sku:variant.sku,
            price: variant.prices
                ? variant.prices[0]
                    ? variant.prices[0].value.centAmount
                    : 0
                : 0,
            image: variant.images
                ? variant.images[0]
                    ? variant.images[0].url : image : image,
          }
        })
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

  async getProductBySku(ctx) {
    const sku = ctx.params.id;
    const product = (await strapi
      .plugin('commercetools')
      .service('productService')
      .getProductBySku(sku)) as ClientResponse<ProductProjectionPagedQueryResponse>;

    const productData = product.body.results[0];

    if (!productData) {
      return {};
    }

    const masterProduct = {
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
    }
    const variant = productData.variants.find((variant) => variant.sku === sku);
    if (variant) {
      return {
        title: `${sku} (${productData.name[CT_DEFAULT_LOCALE]})`,
        slug: variant.sku,
        image: variant.images
          ? variant.images[0]
            ? variant.images[0].url
            : CT_PLACEHOLDER_IMG_URL
          : CT_PLACEHOLDER_IMG_URL,
        price: variant.prices
          ? variant.prices[0]
            ? variant.prices[0].value.centAmount
            : 0
          : 0,
        master: masterProduct,
      }
    }

    // Filter down only the necessary fields
    // Throw errors are picked up by the client as 500
    return masterProduct;
  },
});
