import { Strapi } from '@strapi/strapi';

export default ({ strapi }: { strapi: Strapi }) => ({
  async getUrlBySlug(ctx): Promise<string> {
    const { contentTypeUID, data } = ctx.request.body;

    if (!contentTypeUID || !data) {
      throw new Error('Content type and data are required');
    }

    return await strapi
      .plugin('commercetools')
      .service('urlService')
      .getUrlBySlug(contentTypeUID, data);
  },
});
