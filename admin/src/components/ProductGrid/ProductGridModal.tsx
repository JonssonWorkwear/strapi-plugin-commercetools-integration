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

import { useFetchClient } from '@strapi/helper-plugin';

import { ProductCard } from './ProductCard';

const Grid = styled(GridLayout)`
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
`;

type ProductGridModalProps = {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onFinish: (selectedProductSlug: string | null) => void;
  initialSelectedProductSlug?: string | null;
};

type ProductModelType = {
  slug: string;
  title: string;
  price: number;
  image: string;
};

export function ProductGridModal({
  setIsModalOpen,
  onFinish,
  initialSelectedProductSlug,
}: ProductGridModalProps) {
  const { get } = useFetchClient();

  const [productData, setProductData] = useState<Array<ProductModelType>>([]);
  const [selectedProductSlug, setSelectedProductSlug] = useState<string | null>(null);

  async function fetchData() {
    const { data } = await get('/commercetools/getAllProducts');
    console.log('product', data);

    setProductData(data);
  }

  function onClose() {
    // Close the modal if the value didn't change
    if (initialSelectedProductSlug === selectedProductSlug) {
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
    if (initialSelectedProductSlug) {
      setSelectedProductSlug(initialSelectedProductSlug);
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
                const isSelected = selectedProductSlug === product.slug;
                console.log('product', product);

                return (
                  <ProductCard
                    key={`product-${product.slug}`}
                    slug={product.slug}
                    title={product.title}
                    price={product.price}
                    image={product.image}
                    selected={isSelected}
                    onSelection={() => {
                      setSelectedProductSlug(product.slug);
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
                onFinish(selectedProductSlug);
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
