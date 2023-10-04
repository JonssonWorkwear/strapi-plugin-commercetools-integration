import React from 'react';

import styled from 'styled-components';

import { Flex, Icon, Typography } from '@strapi/design-system';

import { CommercetoolsGrayIcon } from '../../CommercetoolsIcon';

const TextAlignTypography = styled(Typography)`
  align-items: center;
  margin-top: 8px;
  color: #900c3f;
`;

export function ProductCarouselError() {
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
      <Icon as={CommercetoolsGrayIcon} aria-hidden width="32px" height="24px" />
      <TextAlignTypography variant="pi" fontWeight="bold" as="span">
        The Commercetools integration is not configured properly.
      </TextAlignTypography>
    </Flex>
  );
}
