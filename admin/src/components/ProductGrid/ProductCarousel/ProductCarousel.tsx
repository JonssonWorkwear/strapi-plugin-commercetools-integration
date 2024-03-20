import React from 'react';

import { MessageDescriptor } from 'react-intl';

import { CarouselInput, CarouselSlide } from '@strapi/design-system';

import { ProductCarouselActions } from './ProductCarouselActions';
import { ProductCarouselSlide } from './ProductCarouselSlide';

type ProductCarouselProps = {
  name: string;
  description?: MessageDescriptor;
  required?: boolean;
  error?: string;
  openModal: () => void;
  onDelete: () => void;
  disabled?: boolean;
  isError: boolean;
  isLoading: boolean;
  product?: {
    slug: string;
    title: string;
    image: string;
    price: number;
  } | null;
};

export function ProductCarousel({
  name,
  description,
  openModal,
  onDelete,
  required,
  error,
  disabled = false,
  product,
  isError,
  isLoading,
}: ProductCarouselProps) {
  return (
    <CarouselInput
      label={name}
      selectedSlide={0}
      hint={description}
      required={required}
      error={error}
      disabled={disabled}
      style={error ? { border: '1px solid #d02b20', borderRadius: 5 } : null}
      actions={
        product && !isLoading && !isError ? (
          <ProductCarouselActions openModal={openModal} onDelete={onDelete} disabled={disabled} />
        ) : undefined
      }
    >
      <CarouselSlide label="1 of 1 products" style={{ height: '100%' }}>
        <ProductCarouselSlide
          product={product}
          isError={isError}
          isLoading={isLoading}
          disabled={disabled}
          openModal={openModal}
        />
      </CarouselSlide>
    </CarouselInput>
  );
}
