'use strict';

module.exports = ({ strapi }) => {
  strapi.customFields.register({
    name: 'ProductGrid',
    plugin: 'commercetools',
    type: 'text',
    inputSize: {
      default: 12,
      isResizable: false,
    },
  });
};
