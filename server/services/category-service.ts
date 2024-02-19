import { client } from './commercetools/client';

export default () => ({
  async getAllCategories() {
    return client.categories().get().execute();
  },

  async getCategoryById(id: string) {
    return client.categories().withId({ ID: id }).get().execute();
  },
});
