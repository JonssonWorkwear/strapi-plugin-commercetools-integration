import React from 'react';

import styled from 'styled-components';

import { Flex, Icon, Typography } from '@strapi/design-system';

import { CommercetoolsPlusIcon, CommercetoolsGrayIcon } from '../../CommercetoolsIcon';

const TextAlignTypography = styled(Typography)`
  align-items: center;
  margin-top: 8px;
`;

type EmptyStateProps = {
  disabled?: boolean;
  onClick?: () => void;
};

export function ProductCarouselEmpty({ disabled, onClick }: EmptyStateProps) {
  return (
    <Flex
      direction="column"
      justifyContent="center"
      alignItems="center"
      height="100%"
      width="100%"
      as="button"
      type="button"
      disabled={disabled}
      onClick={onClick}
      style={{
        cursor: disabled ? 'not-allowed' : 'pointer',
        marginTop: '28px',
        marginBottom: '28px',
      }}
    >
      <Icon
        as={disabled ? CommercetoolsGrayIcon : CommercetoolsPlusIcon}
        aria-hidden
        width="32px"
        height="24px"
      />
      <TextAlignTypography
        variant="pi"
        fontWeight="bold"
        textColor="neutral600"
        style={{ textAlign: 'center' }}
        as="span"
      >
        Click to select and reference a product
      </TextAlignTypography>
    </Flex>
  );
}
