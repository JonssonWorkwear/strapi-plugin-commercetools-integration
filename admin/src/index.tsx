import { prefixPluginTranslations } from '@strapi/helper-plugin';

import { PluginIcon } from './components/CommercetoolsIcon';

import pluginId from './pluginId';

export default {
  register(app: any) {
    app.customFields.register({
      name: 'ProductGrid',
      pluginId: pluginId,
      type: 'text',
      icon: PluginIcon,
      intlLabel: {
        id: 'commercetools.label',
        defaultMessage: 'Product grid',
      },
      intlDescription: {
        id: 'commercetools.description',
        defaultMessage: 'List of products, then pick one',
      },
      components: {
        Input: async () =>
          import(
            /* webpackChunkName: "color-picker-input-component" */ './components/ProductGrid'
          ).then((module) => ({ default: module.ProductGrid })),
      },
      options: {
        advanced: [
          {
            sectionTitle: {
              id: 'commercetools.settings',
              defaultMessage: 'Settings',
            },
            items: [
              {
                name: 'required',
                type: 'checkbox',
                intlLabel: {
                  id: 'commercetools.required.label',
                  defaultMessage: 'Required field',
                },
                description: {
                  id: 'commercetools.required.description',
                  defaultMessage: "You won't be able to create an entry if this field is empty",
                },
              },
            ],
          },
        ],
      },
    });
  },

  async registerTrads({ locales }: { locales: string[] }) {
    const importedTrads = await Promise.all(
      locales.map((locale) => {
        return import(`./translations/${locale}.json`)
          .then(({ default: data }) => {
            return {
              data: prefixPluginTranslations(data, pluginId),
              locale,
            };
          })
          .catch(() => {
            return {
              data: {},
              locale,
            };
          });
      })
    );

    return Promise.resolve(importedTrads);
  },
};
