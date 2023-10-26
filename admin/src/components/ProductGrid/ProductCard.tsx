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
          <CardSubtitle>R{price}</CardSubtitle>
        </CardContent>
        {/* <CardBadge>Doc</CardBadge> */}
      </CardBody>
    </Card>
  );
}
