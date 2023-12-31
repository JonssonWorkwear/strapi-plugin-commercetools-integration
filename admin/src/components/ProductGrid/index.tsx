import React, { useState, useEffect } from 'react';
import { useIntl, MessageDescriptor } from 'react-intl';

import { useFetchClient, useNotification } from '@strapi/helper-plugin';

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
  slug: string;
  title: string;
  image: string;
  price: number;
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
  const toggleNotification = useNotification();
  const { get } = useFetchClient();

  const { formatMessage } = useIntl();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [productData, setProductData] = useState<ProductModelType | null>(null);

  // Set initial productData
  useEffect(() => {
    async function fetchData(productSlug: string) {
      try {
        setIsLoading(true);
        const { data } = await get(`/commercetools/getProductBySlug/${productSlug}`);

        if (Object.keys(data).length === 0) {
          handleChange(null);
          toggleNotification({
            type: 'softWarning',
            message: "This product doesn't exist anymore.",
            title: 'Warning:',
          });
        } else {
          setProductData(data);
          setIsLoading(false);
        }
      } catch (e) {
        console.error(e);
        setIsError(true);
        setIsLoading(false);
        toggleNotification({
          type: 'warning',
          message: 'Something went wrong with the Commercetools server.',
          title: 'Error:',
        });
      }
    }

    if (value) {
      fetchData(value);
    } else {
      setProductData(null);
      setIsLoading(false);
    }
  }, [value]);

  // Update the selected product data and the value
  // of the entry – visible to the API!
  function handleChange(productSlug: string | null) {
    onChange({ target: { name, value: productSlug } });
  }
  return (
    <>
      <ProductCarousel
        name={formatMessage(intlLabel)}
        required={required}
        error={error}
        description={description}
        disabled={disabled}
        isError={isError}
        isLoading={isLoading}
        openModal={() => setIsModalOpen(true)}
        onDelete={() => handleChange(null)}
        product={productData}
      />

      {isModalOpen ? (
        <ProductGridModal
          setIsModalOpen={setIsModalOpen}
          initialSelectedProductSlug={value}
          onFinish={(data) => {
            handleChange(data);
          }}
        />
      ) : null}
    </>
  );
}
