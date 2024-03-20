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
  SearchForm,
  Searchbar,
} from '@strapi/design-system';

import { useFetchClient, NoContent } from '@strapi/helper-plugin';

import { useDebounce } from 'use-debounce';
import { useInView } from 'react-intersection-observer';

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

  // Pagination hooks
  const { ref, inView, entry } = useInView({ threshold: 1 });
  const [debouncedInView] = useDebounce(inView, 250);

  const [hasMorePages, setHasMorePages] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(0);

  async function fetchData(search: string = '') {
    // Fetch data only if there are more pages to fetch
    // or it's the first fetch
    if (hasMorePages || currentPage === 0) {
      setIsLoading(true);

      const { data } = await get(
        `/commercetools/getAllProducts?page=${currentPage + 1}&search=${search}`
      );

      // If there are no offset products, there are no more pages
      if (data.pagination.offset + data.pagination.count >= data.pagination.total) {
        setHasMorePages(false);
      } else {
        setHasMorePages(true);
        setCurrentPage((prev) => prev + 1);
      }

      // If it's the first page, set the data or replace it
      // otherwise append the new data
      if (currentPage === 0) {
        setProductData(data.results);
      } else {
        setProductData((prev) => [...prev, ...data.results]);
      }

      setIsLoading(false);
    }
  }

  // Close the modal if the value didn't change
  function onClose() {
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

  // Set initial product selection
  useEffect(() => {
    if (initialSelectedProductSlug) {
      setSelectedProductSlug(initialSelectedProductSlug);
    }
  }, [initialSelectedProductSlug]);

  // Fetch data when the user scrolls to the bottom of the page
  useEffect(() => {
    if (debouncedInView) {
      fetchData(debouncedSearchValue);
    }
  }, [debouncedInView]);

  // This is a stupid hack to reset the page when the search value changes
  // before it gets debounced. This way getCurrentPage is always 0 when the
  // search value changes. Not my proudest work
  useEffect(() => {
    setCurrentPage(0);
  }, [searchValue]);

  useEffect(() => {
    setCurrentPage(0);
    fetchData(debouncedSearchValue);
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
          {productData.length === 0 && !isLoading ? (
            <NoContent
              content={{
                id: 'commercetools.no-products',
                defaultMessage: 'No products found',
              }}
            />
          ) : (
            <>
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
              {hasMorePages && <div ref={ref} />}
              {(isLoading || (debouncedInView && hasMorePages)) && (
                <Flex alignItems="center" justifyContent="center" style={{ marginTop: '20px' }}>
                  <Loader>Loading products...</Loader>
                </Flex>
              )}
            </>
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
