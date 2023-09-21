import React from 'react';

import {
  Card,
  CardBody,
  CardContent,
  CardTitle,
  CardSubtitle,
  CardHeader,
  CardAsset,
} from '@strapi/design-system';

type ProductCarouselProductCardProps = {
  id: string;
  title: string;
  image: string;
  price: number;
};

export function ProductCarouselCard({ id, title, image, price }: ProductCarouselProductCardProps) {
  return (
    <Card id={`product-${id}`} style={{ width: '300px', marginTop: '18px', marginBottom: '18px' }}>
      <CardHeader>
        <CardAsset src={image} />
      </CardHeader>
      <CardBody>
        <CardContent>
          <CardTitle>{title}</CardTitle>
          <CardSubtitle>R{price}</CardSubtitle>
        </CardContent>
      </CardBody>
    </Card>
  );
}
