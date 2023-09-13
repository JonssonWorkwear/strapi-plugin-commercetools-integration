import { Strapi } from '@strapi/strapi';

import { DUMMY_DATA as data } from './data';

export default ({ strapi }: { strapi: Strapi }) => ({
  async getAllProducts() {
    return data;
  },

  async getProductById(id: string) {
    return data.find((product) => product.id === id);
  },
});
