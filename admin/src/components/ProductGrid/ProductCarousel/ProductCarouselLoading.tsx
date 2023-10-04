import React from 'react';

import { Flex, Loader, Typography } from '@strapi/design-system';

export function ProductCarouselLoading() {
  return (
    <Flex
      direction="column"
      justifyContent="center"
      alignItems="center"
      height="100%"
      width="100%"
      disabled={true}
      style={{ cursor: 'not-allowed', marginTop: '28px', marginBottom: '28px' }}
    >
      <Loader>Loading content...</Loader>
    </Flex>
  );
}
