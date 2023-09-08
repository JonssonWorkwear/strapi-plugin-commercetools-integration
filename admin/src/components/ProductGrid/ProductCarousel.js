import React, { useState } from 'react';

import PropTypes from 'prop-types';

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

export function ProductCarousel({ name, description, required, error, disabled, products }) {
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
              onClick={() => console.log('edit')}
              label="Edit"
              aria-label="Edit"
              id="edit"
              icon={<Pencil />}
              disabled={disabled}
            />
            <IconButton
              onClick={() => console.log('Delete')}
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
          <EmptyState disabled={disabled} />
        </CarouselSlide>
      ) : (
        products.map((product, index) => (
          <CarouselSlide
            key={product.id}
            label={`${index + 1} of ${products.length} products`}
            style={{ height: '250px' }}
          >
            <Card id={`product-${product.id}`} style={{ width: '300px' }}>
              <CardHeader>
                <CardAsset src={product.imageUrl} />
              </CardHeader>
              <CardBody>
                <CardContent>
                  <CardTitle>{product.title}</CardTitle>
                  <CardSubtitle>R{product.price}</CardSubtitle>
                </CardContent>
                {/* <CardBadge>Doc</CardBadge> */}
              </CardBody>
            </Card>
          </CarouselSlide>
        ))
      )}
    </CarouselInput>
  );
}

ProductCarousel.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  required: PropTypes.bool,
  error: PropTypes.any,
  disabled: PropTypes.bool,
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      imageUrl: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    })
  ).isRequired,
};
