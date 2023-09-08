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

import { request } from '@strapi/helper-plugin';
import { useIntl } from 'react-intl';

import ProductCarousel from './ProductCarousel';

export function ProductGrid({
  intlLabel,
  name,
  onChange,
  value,
  labelAction,
  required,
  error,
  description,
}) {
  const { formatMessage } = useIntl();

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
    <Field name={name} id={name} error={error} hint={description}>
      <Flex justifyContent="space-between" paddingBottom={2}>
        <FieldLabel labelAction={labelAction} required={required}>
          {formatMessage(intlLabel)}
        </FieldLabel>
      </Flex>
      <ProductCarousel />
      <Box padding={8} background="neutral100">
        {productData.length > 0 ? (
          <GridLayout>
            {productData.map((product) => (
              <Card id={`product-${product.id}`}>
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
          </GridLayout>
        ) : (
          <Flex alignItems="center" justifyContent="center">
            <Loader>Loading content...</Loader>
          </Flex>
        )}
      </Box>
      <FieldHint />
      <FieldError />
    </Field>
  );
}
