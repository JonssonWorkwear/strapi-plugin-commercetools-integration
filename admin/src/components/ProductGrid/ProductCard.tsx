import React from 'react';

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

type ProductCardProps = {
  slug: string;
  title: string;
  price: number;
  image: string;
  selected: boolean;
  onSelection: () => void;
} & Record<string, any>;

function formatPrice(price: number) {
  return new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR',
    minimumFractionDigits: 2,
  }).format(price);
}

export function ProductCard({
  slug,
  title,
  price,
  image,
  selected,
  onSelection,
  ...props
}: ProductCardProps) {
  return (
    <Card key={props.key}>
      <CardHeader>
        <CardCheckbox value={selected} onValueChange={onSelection} />
        <CardAsset src={image} />
      </CardHeader>
      <CardBody>
        <CardContent>
          <CardTitle>{title}</CardTitle>
          <CardSubtitle>
            {price !== 0 ? formatPrice(price / 100) : 'Price unavailable'}
          </CardSubtitle>
        </CardContent>
        {/* <CardBadge>Doc</CardBadge> */}
      </CardBody>
    </Card>
  );
}
