# Commercetools integration custom field

This package provides a custom field for Strapi that allows content editors to search and reference products from [Commercetools](https://commercetools.com/).

![Commercetools custom field preview. Features a selected product.](https://github.com/JonssonWorkwear/strapi-plugin-commercetools-integration/assets/22895284/0a373a5a-c563-498b-bed4-0346a9442450)

<div align="center">
  <a href="https://github.com/JonssonWorkwear/strapi-plugin-commercetools-integration/actions/workflows/release.yml">
    <img src="https://github.com/JonssonWorkwear/strapi-plugin-commercetools-integration/actions/workflows/release.yml/badge.svg?branch=release" alt="Release status">
  </a>
  <a href="https://www.npmjs.com/package/@jonssonworkwear/strapi-plugin-commercetools-integration">
    <img alt="npm (scoped)" src="https://img.shields.io/npm/v/%40jonssonworkwear/strapi-plugin-commercetools-integration?logo=npm&label=%40jonssonworkwear%2Fstrapi-plugin-commercetools-integration&color=%234845F5">
  </a>
</div>

## 🏖️ Features

* **Search products:** to make the right choice. 
* **Select products:** to make them available to the API.

## 🔧 Installation

To install this plugin simply run this command in the Strapi project:

```
yarn add @jonssonworkwear/strapi-plugin-commercetools-integration
```

Inside Strapi's `.env` file, add the Commercetools credentials. Without them the plugin cannot connect to the project. Read more about creating them at [Get started with the TypeScript SDK | commercetools](https://docs.commercetools.com/sdk/js-sdk-getting-started). 

```
CT_PROJECT_KEY=key
CT_CLIENT_ID=id
CT_CLIENT_SECRET=secret
CT_SCOPE=scope
CT_REGION=region
CT_DEFAULT_LOCALE=en-US
CT_CDN_URL=cdn
```

### Content-type builder

When adding a new field to a content type, select **CUSTOM** (instead of **DEAFULT**), then select **Product grid**.

![Commercetools custom field preview inside the content type builder](https://github.com/JonssonWorkwear/strapi-plugin-commercetools-integration/assets/22895284/e1c29967-ddbe-4343-bd98-c5f67b6a6198)

Inside a content-type, we can use the following schema:

```json
"icon": {
  "type": "customField",
  "customField": "plugin::commercetools.ProductGrid"
}
```

## ✨ Usage

* **Select product:** Click on _Click to select and reference a product_, navigate the modal to select one product
* **Edit selection:** Click on the _Edit_ button with the pen icon, navigate the modal to change the selection
* **Remove selection:** Click on the _Delete_ button with the trash bin icon

## 🪛 Development

Clone this repository in the Strapi directory.

```
git clone https://github.com/JonssonWorkwear/strapi-plugin-commercetools-integration.git src/plugins/strapi-plugin-commercetools-integration
```

Add the plugin to the yarn workspace, inside `./package.json` file, so we won't need to use `yarn` inside plugin itself.

```
"workspaces": ["./src/plugins/strapi-plugin-commercetools-integration"]
```

Install dependencies.

```
yarn
```

Register the plugin so Strapi can use it. Inside `./config/plugins.js` file add an entry:

```
module.exports = ({ env }) => ({
  "component-name": {
    enabled: true,
    resolve: "./src/plugins/strapi-plugin-commercetools-integration"
  },
});
```

Rebuild the project and start the server.

```
yarn build
yarn develop
```

Or perhaps use the `--watch-admin` flag to toggle hot reloading of the admin panel.

```
yarn develop --watch-admin
```

### Release changes

All the changes are commited and pushed to _this_ repository (or its forks), independently from the Strapi directory. The changes on the `release` branch will be published in the `@jonssonworkwear/strapi-plugin-commercetools-integration` package. If there is a new release published, plugins inside the Strapi project might need their version bumped.

