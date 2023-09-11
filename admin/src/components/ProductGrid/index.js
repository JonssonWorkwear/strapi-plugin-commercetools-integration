import React, { useState, useEffect } from 'react';

import {
  Field,
  FieldLabel,
  FieldHint,
  FieldError,
  Flex,
  Box,
  GridLayout,
  Card,
  CardHeader,
  CardCheckbox,
  CardAsset,
  CardBody,
  CardContent,
  CardTitle,
  CardSubtitle,
  Loader,
} from '@strapi/design-system';

import { useIntl } from 'react-intl';

import { ProductCarousel } from './ProductCarousel';
import { Modal } from './Modal';

export default function ProductGrid({
  intlLabel,
  name,
  onChange,
  value,
  labelAction,
  required,
  error,
  description,
  disabled,
}) {
  const { formatMessage } = useIntl();

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <ProductCarousel
        name={formatMessage(intlLabel)}
        required={required}
        error={error}
        description={description}
        disabled={disabled}
        openModal={() => setIsModalOpen(true)}
        products={[
          {
            id: 1,
            title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
            price: 109.95,
            imageUrl: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
          },
          {
            id: 2,
            title: 'Mens Casual Premium Slim Fit T-Shirts',
            price: 22.3,
            imageUrl: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
          },
          {
            id: 3,
            title: 'Mens Cotton Jacket',
            price: 55.99,
            imageUrl: 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg',
          },
          {
            id: 4,
            title: "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
            price: 695,
            imageUrl: 'https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg',
          },
        ]}
      />

      {isModalOpen ? <Modal setIsModalOpen={setIsModalOpen} /> : null}
    </>
  );
}
