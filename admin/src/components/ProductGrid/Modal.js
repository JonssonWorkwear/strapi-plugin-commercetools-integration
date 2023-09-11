import React from 'react';

import {
  Box,
  Button,
  ModalLayout,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Typography,
} from '@strapi/design-system';

import { ProductGrid } from './ProductGrid';

export function Modal({ setIsModalOpen }) {
  return (
    <ModalLayout onClose={() => setIsModalOpen((prev) => !prev)} labelledBy="title">
      <ModalHeader>
        <Typography fontWeight="bold" textColor="neutral800" as="h2" id="title">
          Add new product
        </Typography>
      </ModalHeader>
      <ModalBody>
        <ProductGrid />
      </ModalBody>
      <ModalFooter
        startActions={
          <Button onClick={() => setIsModalOpen((prev) => !prev)} variant="tertiary">
            Cancel
          </Button>
        }
        endActions={
          <>
            <Button onClick={() => setIsModalOpen((prev) => !prev)}>Finish</Button>
          </>
        }
      />
    </ModalLayout>
  );
}
