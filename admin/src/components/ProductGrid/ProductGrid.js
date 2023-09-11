import React, { useState, useEffect } from 'react';

import styled from 'styled-components';

import {
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

import { request } from '@strapi/helper-plugin';

const Grid = styled(GridLayout)`
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
`;

export function ProductGrid({}) {
  const [productData, setProductData] = useState([]);

  const fetchData = async () => {
    const data = await request('/commercetools/getAllProducts', {
      method: 'GET',
    });

    console.log('data', data);

    setProductData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box>
      {productData.length > 0 ? (
        <Grid>
          {productData.map((product) => (
            <Card key={`product-${product.id}`}>
              <CardHeader>
                <CardCheckbox value />
                <CardAsset src={product.image} />
              </CardHeader>
              <CardBody>
                <CardContent>
                  <CardTitle>{product.title}</CardTitle>
                  <CardSubtitle>R{product.price}</CardSubtitle>
                </CardContent>
                {/* <CardBadge>Doc</CardBadge> */}
              </CardBody>
            </Card>
          ))}
        </Grid>
      ) : (
        <Flex alignItems="center" justifyContent="center" style={{ minHeight: '60vh' }}>
          <Loader>Loading content...</Loader>
        </Flex>
      )}
    </Box>
  );
}
