import React, { useState } from 'react';

import { MessageDescriptor } from 'react-intl';

import {
  CarouselInput,
  CarouselSlide,
  CarouselActions,
  IconButton,
  Card,
  CardBody,
  CardContent,
  CardTitle,
  CardSubtitle,
  CardHeader,
  CardAsset,
  CardBadge,
} from '@strapi/design-system';

import { Pencil, Trash } from '@strapi/icons';

import { EmptyState } from './EmptyState';

type ProductCarouselProps = {
  name: string;
  description?: MessageDescriptor;
  required?: boolean;
  error?: string;
  openModal: () => void;
  onDelete: () => void;
  disabled?: boolean;
  products: Array<{
    id: string;
    title?: string;
    imageUrl?: string;
    price?: number;
  }>;
};

export function ProductCarousel({
  name,
  description,
  openModal,
  onDelete,
  required,
  error,
  disabled,
  products,
}: ProductCarouselProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const carouselLength = products.length === 1 ? 1 : products.length - 1;

  const handleNext = () => {
    setSelectedIndex((current) => (current < carouselLength ? current + 1 : 0));
  };

  const handlePrevious = () => {
    setSelectedIndex((current) => (current > 0 ? current - 1 : carouselLength));
  };

  return (
    <CarouselInput
      label={name}
      selectedSlide={selectedIndex}
      previousLabel="Previous slide"
      nextLabel="Next slide"
      onNext={handleNext}
      onPrevious={handlePrevious}
      hint={description}
      required={required}
      error={error}
      disabled={disabled}
      actions={
        products.length > 0 ? (
          <CarouselActions style={{ cursor: disabled ? 'not-allowed' : 'pointer' }}>
            <IconButton
              onClick={openModal}
              label="Edit"
              aria-label="Edit"
              id="edit"
              icon={<Pencil />}
              disabled={disabled}
            />
            <IconButton
              onClick={onDelete}
              label="Delete"
              aria-label="Delete"
              id="delete"
              icon={<Trash />}
              disabled={disabled}
            />
          </CarouselActions>
        ) : undefined
      }
    >
      {products.length === 0 ? (
        <CarouselSlide label="1 of 1 products">
          <EmptyState disabled={disabled} onClick={openModal} />
        </CarouselSlide>
      ) : (
        products.map((product, index) => (
          <CarouselSlide
            key={product.id}
            label={`${index + 1} of ${products.length} products`}
            style={{ height: '250px' }}
          >
            {/* <Card id={`product-${product.id}`} style={{ width: '300px' }}>
              <CardHeader>
                <CardAsset src={product.imageUrl} />
              </CardHeader>
              <CardBody>
                <CardContent>
                  <CardTitle>{product.title}</CardTitle>
                  <CardSubtitle>R{product.price}</CardSubtitle>
                </CardContent>
                <CardBadge>Doc</CardBadge>
              </CardBody>
            </Card> */}
            {product.id}
          </CarouselSlide>
        ))
      )}
    </CarouselInput>
  );
}
