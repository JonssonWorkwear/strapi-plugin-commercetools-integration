import { Category, ClientResponse, CategoryPagedQueryResponse } from '@commercetools/platform-sdk';
import { Strapi } from '@strapi/strapi';

const { CT_DEFAULT_LOCALE = 'en-ZA' } = process.env;

export default ({ strapi }: { strapi: Strapi }) => ({
  async getAllCategories(ctx) {
    const categories = (await strapi
      .plugin('commercetools')
      .service('categoryService')
      .getAllCategories()) as ClientResponse<CategoryPagedQueryResponse>;

    // Filter down only the necessary fields
    // Throw errors are picked up by the client as 500
    const categoriesData = await Promise.all(
      categories.body.results.map(async (category) => {
        if (category.ancestors.length > 0) {
          // Construct the name using the parent categories
          const parentNamesArray = [] as string[];

          for (const ancestor of category.ancestors) {
            const ancestorData = (await strapi
              .plugin('commercetools')
              .service('categoryService')
              .getCategoryById(ancestor.id)) as ClientResponse<Category>;

            const ancestorName = ancestorData.body.name[CT_DEFAULT_LOCALE];

            parentNamesArray.push(ancestorName);
          }

          const name = parentNamesArray.join(' > ');

          return {
            name: `${name} > ${category.name[CT_DEFAULT_LOCALE]}`,
            slug: category.slug?.[CT_DEFAULT_LOCALE],
          };
        }

        return {
          name: category.name[CT_DEFAULT_LOCALE],
          slug: category.slug?.[CT_DEFAULT_LOCALE],
        };
      })
    );

    ctx.body = categoriesData;
  },
});
