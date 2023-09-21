import React, { useState, useEffect } from 'react';

import styled from 'styled-components';

import {
  Flex,
  Box,
  Button,
  ModalLayout,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Typography,
  GridLayout,
  Loader,
} from '@strapi/design-system';

import { request } from '@strapi/helper-plugin';

import { ProductCard } from './ProductCard';

const Grid = styled(GridLayout)`
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
`;

type ProductGridModalProps = {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onFinish: (selectedProductId: string | null) => void;
  initialSelectedProductId?: string | null;
};

type ProductModelType = {
  id: string;
  title: string;
  price: number;
  image: string;
};

export function ProductGridModal({
  setIsModalOpen,
  onFinish,
  initialSelectedProductId,
}: ProductGridModalProps) {
  const [productData, setProductData] = useState<Array<ProductModelType>>([]);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  async function fetchData() {
    const data = await request('/commercetools/getAllProducts', {
      method: 'GET',
    });

    setProductData(data);
  }

  function onClose() {
    // Close the modal if the value didn't change
    if (initialSelectedProductId === selectedProductId) {
      setIsModalOpen((prev) => !prev);
    } else {
      const result = window.confirm(
        'Are you sure you want to cancel? All your modifications will be lost'
      );
      if (result) {
        setIsModalOpen((prev) => !prev);
      }
    }
  }

  useEffect(() => {
    if (initialSelectedProductId) {
      setSelectedProductId(initialSelectedProductId);
    }

    fetchData();
  }, []);

  return (
    <ModalLayout onClose={onClose} labelledBy="title">
      <ModalHeader>
        <Typography fontWeight="bold" textColor="neutral800" as="h2" id="title">
          Add new product
        </Typography>
      </ModalHeader>
      <ModalBody>
        <Box>
          {productData.length > 0 ? (
            <Grid>
              {productData.map((product) => {
                const isSelected = selectedProductId === product.id;

                return (
                  <ProductCard
                    key={`product-${product.id}`}
                    id={product.id}
                    title={product.title}
                    price={product.price}
                    image={product.image}
                    selected={isSelected}
                    onSelection={() => {
                      setSelectedProductId(product.id);
                    }}
                  />
                );
              })}
            </Grid>
          ) : (
            <Flex alignItems="center" justifyContent="center" style={{ minHeight: '60vh' }}>
              <Loader>Loading content...</Loader>
            </Flex>
          )}
        </Box>
      </ModalBody>
      <ModalFooter
        startActions={
          <Button onClick={onClose} variant="tertiary">
            Cancel
          </Button>
        }
        endActions={
          <>
            <Button
              onClick={() => {
                setIsModalOpen((prev) => !prev);
                onFinish(selectedProductId);
              }}
            >
              Finish
            </Button>
          </>
        }
      />
    </ModalLayout>
  );
}
