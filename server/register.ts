import { Strapi } from '@strapi/strapi';

export default ({ strapi }: { strapi: Strapi }) => {
  strapi.customFields.register({
    name: 'ProductGrid',
    pluginId: 'commercetools',
    type: 'text',
    inputSize: {
      default: 12,
      isResizable: false,
    },
  });
};
