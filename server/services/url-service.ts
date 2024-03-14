const { WEBSITE_PUBLIC_URL } = process.env;

export default () => ({
  // This is a simple service that returns a URL based on the type and slug
  // It is used to generate URLs for the content pages
  // At the moment, the types are hardcoded so there is less friction for
  // content editors, I figured it would be better to have a simple service
  getUrlBySlug(contentTypeUID: string, data: any): string {
    const domain = WEBSITE_PUBLIC_URL
      ? WEBSITE_PUBLIC_URL.replace(/\/$/, '')
      : 'https://jonssonworkwear.net';

    switch (contentTypeUID) {
      case 'api::product-detail-page.product-detail-page': {
        const slug = data.product_id;

        if (!slug) {
          return `${domain}/product/`;
        }

        return `${domain}/product/${slug}`;
      }

      case 'api::category-landing-page.category-landing-page': {
        const slug = data.category_id;

        if (!slug) {
          return `${domain}/categories/`;
        }

        return `${domain}/categories/${data}`;
      }

      case 'api::content-page.content-page': {
        const slug = data.slug;
        const category = data.category;

        if (!slug) {
          return `${domain}/`;
        }

        if (category === 'guide') {
          return `${domain}/guides/${slug}`;
        }

        if (category === 'news') {
          return `${domain}/news/${slug}`;
        }

        return `${domain}/${slug}`;
      }

      case 'api::overview-page.overview-page': {
        const slug = data.slug;

        if (!slug) {
          return `${domain}/`;
        }

        return `${domain}/${slug}`;
      }

      case 'api::product-listing-page.product-listing-page': {
        const slug = data.category_id;

        if (!slug) {
          return `${domain}/products/`;
        }

        return `${domain}/products/${slug}`;
      }

      case 'api::solution.solution': {
        const slug = data.slug;

        if (!slug) {
          return `${domain}/solutions/`;
        }

        return `${domain}/solutions/${slug}`;
      }

      case 'api::customer-service-page.customer-service-page':
        return `${domain}/service/`;

      case 'api::store-locator-page.store-locator-page':
        return `${domain}/stores/`;

      case 'api::page-404.page-404':
        return `${domain}/404/`;

      case 'api::page-500.page-500':
        return `${domain}/500/`;

      case 'api::homepage.homepage':
        return `${domain}/`;

      default:
        return `${domain}/`;
    }
  },
});
