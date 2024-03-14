import { Strapi } from '@strapi/strapi';

export default ({ strapi }: { strapi: Strapi }) => ({
  getUrlBySlug(ctx): string {
    const { contentTypeUID, data } = ctx.request.body;

    if (!contentTypeUID || !data) {
      throw new Error('Content type and data are required');
    }

    return strapi.plugin('commercetools').service('urlService').getUrlBySlug(contentTypeUID, data);
  },
});
