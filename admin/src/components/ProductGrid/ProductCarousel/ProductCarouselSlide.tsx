import React from 'react';

import { ProductCarouselCard } from './ProductCarouselCard';

import { ProductCarouselEmpty } from './ProductCarouselEmpty';
import { ProductCarouselError } from './ProductCarouselError';
import { ProductCarouselLoading } from './ProductCarouselLoading';

type ProductCarouselSlideProps = {
  disabled: boolean;
  isError: boolean;
  isLoading: boolean;
  openModal: () => void;
  product?: {
    slug: string;
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
        slug={product.slug}
        title={product.title}
        price={product.price}
        image={product.image}
      />
    );
  } else {
    return <ProductCarouselEmpty disabled={disabled} onClick={openModal} />;
  }
}
