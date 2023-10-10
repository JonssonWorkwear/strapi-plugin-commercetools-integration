import { Strapi } from '@strapi/strapi';

export default ({ strapi }: { strapi: Strapi }) => {
  strapi.customFields.register({
    name: 'ProductGrid',
    plugin: 'commercetools',
    type: 'text',
    inputSize: {
      default: 12,
      isResizable: false,
    },
  });
  strapi.customFields.register({
    name: 'CategoryList',
    plugin: 'commercetools',
    type: 'text',
  });
};
