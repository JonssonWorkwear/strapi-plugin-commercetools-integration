import React, { useState, useEffect } from 'react';

import { useIntl } from 'react-intl';

import { ProductCarousel } from './ProductCarousel';
import { ProductGridModal } from './ProductGridModal';

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
  const [productData, setProductData] = useState(null);

  // Set initial productData
  useEffect(() => {
    if (value) {
      const productData = fetchProductData(value);
      setProductData(productData);
    } else {
      setProductData([]);
    }
  }, []);

  // Fetch data for the selected product
  function fetchProductData(productId) {
    if (!productId) return [];

    return [{ id: productId }];
  }

  // Update the selected product data and the value
  // of the entry – visible to the API!
  function handleChange(productId) {
    const productData = fetchProductData(productId);
    const productIdString = productId && productId.toString();

    setProductData(productData);
    onChange({ target: { name, value: productIdString } });
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
