import React from 'react';
import PropTypes from 'prop-types';

import {
  Card,
  CardHeader,
  CardCheckbox,
  CardAsset,
  CardBody,
  CardContent,
  CardTitle,
  CardSubtitle,
} from '@strapi/design-system';

export function ProductCard({ id, title, price, image, selected, onSelection, ...props }) {
  return (
    <Card key={props.key}>
      <CardHeader>
        <CardCheckbox value={selected} onValueChange={onSelection} />
        <CardAsset src={image} />
      </CardHeader>
      <CardBody>
        <CardContent>
          <CardTitle>{title}</CardTitle>
          <CardSubtitle>R{price}</CardSubtitle>
        </CardContent>
        {/* <CardBadge>Doc</CardBadge> */}
      </CardBody>
    </Card>
  );
}

ProductCard.defaultProps = {
  selected: false,
  onSelection: undefined,
  image: '',
  title: '',
  price: 0,
};

ProductCard.propTypes = {
  selected: PropTypes.bool.isRequired,
  onSelection: PropTypes.func.isRequired,
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};
