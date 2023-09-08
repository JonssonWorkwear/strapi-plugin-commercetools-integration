import React from 'react';

import { Flex, Icon, Typography } from '@strapi/design-system';

import PropTypes from 'prop-types';
import styled from 'styled-components';

import { CommercetoolsPlusIcon, CommercetoolsGrayIcon } from '../CommercetoolsIcon';

const TextAlignTypography = styled(Typography)`
  align-items: center;
  margin-top: 8px;
`;

export function EmptyState({ disabled, onClick }) {
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
      style={{ cursor: disabled ? 'not-allowed' : 'pointer' }}
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

EmptyState.defaultProps = {
  disabled: false,
};

EmptyState.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};
