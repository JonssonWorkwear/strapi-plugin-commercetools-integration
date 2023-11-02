import { client } from './commercetools/client';

export default () => ({
  async createCustomObject({
    container,
    key,
    value,
  }: {
    container: string;
    key: string;
    value: string;
  }) {
    return client
      .customObjects()
      .post({
        body: {
          container,
          key,
          value,
        },
      })
      .execute();
  },
});
