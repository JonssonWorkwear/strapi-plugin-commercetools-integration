import { Strapi } from '@strapi/strapi';

import { client } from './commercetools/client';

export default ({ strapi }: { strapi: Strapi }) => ({
  async createCustomObject({
    container,
    key,
    value,
  }: {
    container: string;
    key: string;
    value: string;
  }) {
    console.log('createCustomObject', {
      container,
      key,
      value,
    });

    const customObject = await client
      .customObjects()
      .post({
        body: {
          container,
          key,
          value,
        },
      })
      .execute();

    // Thrown errors are caught by the admin error handler
    return {
      id: customObject.body.id,
      container: customObject.body.container,
      key: customObject.body.key,
      value: customObject.body.value,
    };
  },
});
