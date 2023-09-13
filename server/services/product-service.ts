import { Strapi } from '@strapi/strapi';

import { DUMMY_DATA as data } from './data';

export default ({ strapi }: { strapi: Strapi }) => ({
  async getAllProducts() {
    await new Promise((resolve) => setTimeout(resolve, 600));
    return data;
  },

  async getProductById(id: string) {
    return data.find((product) => product.id === id);
  },
});
