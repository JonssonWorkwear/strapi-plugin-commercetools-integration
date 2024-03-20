import React, { useState, useEffect } from 'react';
import { useIntl, MessageDescriptor } from 'react-intl';

import { useFetchClient, useNotification, useCMEditViewDataManager } from '@strapi/helper-plugin';

import { ProductGridModal } from './ProductGridModal';
import { ProductCarousel } from './ProductCarousel';

type ProductGridProps = {
  contentTypeUID: string;
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
  contentTypeUID,
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
  const { get, post } = useFetchClient();
  const { formatMessage } = useIntl();
  const { initialData } = useCMEditViewDataManager();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
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

    async function validateSlug(productSlug: string) {
      try {
        const { data } = await post(`/commercetools/url/validate`, {
          contentTypeUID,
          slug: productSlug,
          initialSlug: initialData?.[name],
          field: name,
        });

        if (data.isValid) {
          setErrorMessage(undefined);
        } else {
          setErrorMessage('This product page already exists.');
        }
      } catch (e) {
        console.error(e);
      }
    }

    if (value) {
      validateSlug(value);
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
        error={error || errorMessage}
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
