import React, { useState, useEffect } from 'react';

import { useDebounce } from 'use-debounce';

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
  SearchForm,
  Searchbar,
} from '@strapi/design-system';

import { useFetchClient, NoContent } from '@strapi/helper-plugin';

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
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Debounce the search value
  const [searchValue, setSearchValue] = useState<string>('');
  const [debouncedSearchValue] = useDebounce(searchValue, 300);

  async function fetchData(page: number = 1, search: string = '') {
    setIsLoading(true);
    const { data } = await get(`/commercetools/getAllProducts?page=${page}&search=${search}`);

    setProductData(data);
    setIsLoading(false);
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

  useEffect(() => {
    fetchData(1, debouncedSearchValue);
  }, [debouncedSearchValue]);

  return (
    <ModalLayout onClose={onClose} labelledBy="title">
      <ModalHeader>
        <Typography fontWeight="bold" textColor="neutral800" as="h2" id="title">
          Add new product
        </Typography>
      </ModalHeader>
      <ModalBody style={{ minHeight: '60vh' }}>
        <Box>
          <SearchForm style={{ marginBottom: '20px' }}>
            <Searchbar
              name="query"
              onClear={() => setSearchValue('')}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              clearLabel="Clear the search query"
              placeholder="Search for products..."
            >
              Search for products
            </Searchbar>
          </SearchForm>
          {isLoading ? (
            <Flex alignItems="center" justifyContent="center" style={{ minHeight: '40vh' }}>
              <Loader>Loading products...</Loader>
            </Flex>
          ) : productData.length === 0 ? (
            <NoContent
              content={{
                id: 'commercetools.no-products',
                defaultMessage: 'No products found',
              }}
            />
          ) : (
            <Grid>
              {productData.map((product) => {
                const isSelected = selectedProductSlug === product.slug;

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
