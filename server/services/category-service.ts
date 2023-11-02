import { client } from './commercetools/client';

export default () => ({
  async getAllCategories() {
    return client.categories().get().execute();
  },
});
