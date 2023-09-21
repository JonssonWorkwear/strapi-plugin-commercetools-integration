import React from 'react';

import { ProductCarouselCard } from './ProductCarouselCard';

import {
  CarouselSlide,
  Card,
  CardHeader,
  CardAsset,
  CardBody,
  CardContent,
  CardTitle,
  CardSubtitle,
} from '@strapi/design-system';
import { ProductCarouselEmpty } from './ProductCarouselEmpty';
import { ProductCarouselError } from './ProductCarouselError';
import { ProductCarouselLoading } from './ProductCarouselLoading';

type ProductCarouselSlideProps = {
  disabled: boolean;
  isError: boolean;
  isLoading: boolean;
  openModal: () => void;
  product?: {
    id: string;
    title: string;
    image: string;
    price: number;
  } | null;
};

export function ProductCarouselSlide({
  product,
  disabled,
  openModal,
  isError,
  isLoading,
}: ProductCarouselSlideProps) {
  if (isLoading) {
    return <ProductCarouselLoading />;
  } else if (isError) {
    return <ProductCarouselError />;
  } else if (product) {
    return (
      <ProductCarouselCard
        id={product.id}
        title={product.title}
        price={product.price}
        image={product.image}
      />
    );
  } else {
    return <ProductCarouselEmpty disabled={disabled} onClick={openModal} />;
  }
}
