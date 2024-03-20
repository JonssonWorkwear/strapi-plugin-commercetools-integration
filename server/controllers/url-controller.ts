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

  async validateSlug(ctx): Promise<any> {
    // If strapi is not available, throw an error
    if (!strapi || !strapi.db) {
      throw new Error('Internal Strapi Error');
    }

    const { contentTypeUID, slug, field, initialSlug } = ctx.request.body;

    // Validate the input
    if (!contentTypeUID || !slug || !field) {
      throw new Error('Content type, slug, and filed are required');
    }

    // Query the database for the content type
    const query = strapi.db.query(contentTypeUID);

    // Count the number of entries with the same slug
    const count: number = await query.count({
      where: { [field]: slug },
    });

    if (count > 0) {
      // If the slug is the same as the initial slug, return true
      // Doing this to avoid collision with the same slug that has been already published
      if (count === 1 && initialSlug === slug) {
        return {
          isValid: true,
        };
      }

      return {
        isValid: false,
      };
    }

    return {
      isValid: true,
    };
  },
});
