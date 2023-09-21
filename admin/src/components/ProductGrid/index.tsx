import React, { useState, useEffect } from 'react';
import { useIntl, MessageDescriptor } from 'react-intl';

import { request } from '@strapi/helper-plugin';

import { ProductGridModal } from './ProductGridModal';
import { ProductCarousel } from './ProductCarousel';

type ProductGridProps = {
  intlLabel: MessageDescriptor;
  onChange: (event: { target: { name: string; value?: string | null; type?: string } }) => void;
  name: string;
  description?: MessageDescriptor;
  disabled?: boolean;
  error?: string;
  labelAction?: React.ReactNode;
  required?: boolean;
  value?: string;
};

type ProductModelType = {
  id: string;
  title?: string;
  imageUrl?: string;
  price?: number;
};

export function ProductGrid({
  intlLabel,
  name,
  onChange,
  value,
  labelAction,
  required,
  error,
  description,
  disabled,
}: ProductGridProps) {
  const { formatMessage } = useIntl();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [productData, setProductData] = useState<Array<ProductModelType> | null>(null);

  // Set initial productData
  useEffect(() => {
    async function fetchData(productId: string) {
      const productData = await request(`/commercetools/getProductById/${productId}`, {
        method: 'GET',
      });

      // rename image to imageUrl
      productData.imageUrl = productData.image;
      setProductData([productData]);
    }

    if (value) {
      fetchData(value);
    } else {
      setProductData([]);
    }
  }, [value]);

  // Update the selected product data and the value
  // of the entry – visible to the API!
  function handleChange(productId: string | null) {
    onChange({ target: { name, value: productId } });
  }

  if (productData) {
    return (
      <>
        <ProductCarousel
          name={formatMessage(intlLabel)}
          required={required}
          error={error}
          description={description}
          disabled={disabled}
          openModal={() => setIsModalOpen(true)}
          onDelete={() => handleChange(null)}
          products={productData}
        />

        {isModalOpen ? (
          <ProductGridModal
            setIsModalOpen={setIsModalOpen}
            onFinish={(data) => {
              handleChange(data);
            }}
            initialSelectedProductId={value}
          />
        ) : null}
      </>
    );
  }
}