import { prefixPluginTranslations } from "@strapi/helper-plugin";

import pluginId from "./pluginId";

import PluginIcon from "./components/PluginIcon";

export default {
  register(app) {
    app.customFields.register({
      name: "ProductGrid",
      pluginId: pluginId,
      type: "text",
      icon: PluginIcon,
      intlLabel: {
        id: "commercetools.label",
        defaultMessage: "Product grid",
      },
      intlDescription: {
        id: "commercetools.description",
        defaultMessage: "List of products, then pick one",
      },
      components: {
        Input: async () => import("./components/ProductGrid"),
      },
      options: {
        advanced: [
          {
            sectionTitle: {
              id: "commercetools.settings",
              defaultMessage: "Settings",
            },
            items: [
              {
                name: "required",
                type: "checkbox",
                intlLabel: {
                  id: "commercetools.required.label",
                  defaultMessage: "Required field",
                },
                description: {
                  id: "commercetools.required.description",
                  defaultMessage:
                    "You won't be able to create an entry if this field is empty",
                },
              },
            ],
          },
        ],
      },
    });
  },

  bootstrap() {},

  async registerTrads({ locales }) {
    const importedTrads = await Promise.all(
      locales.map((locale) => {
        return import(
          /* webpackChunkName: "translation-[request]" */ `./translations/${locale}.json`
        )
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
