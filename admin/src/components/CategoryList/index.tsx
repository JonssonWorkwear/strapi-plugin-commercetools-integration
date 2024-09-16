import React, { useState, useEffect } from 'react';

import { useFetchClient, useNotification, useCMEditViewDataManager } from '@strapi/helper-plugin';

import { SingleSelect, SingleSelectOption } from '@strapi/design-system';

import { useIntl, MessageDescriptor } from 'react-intl';

type CategoryListProps = {
  contentTypeUID: string;
  onChange: (event: { target: { name: string; value?: string | null; type?: string } }) => void;
  name: string;
  intlLabel: MessageDescriptor;
  hint?: string;
  disabled?: boolean;
  error?: string;
  required?: boolean;
  value?: string;
};

type CategoryModelType = {
  name: string;
  slug: string;
};

export function CategoryList({
  contentTypeUID,
  name,
  intlLabel,
  onChange,
  value,
  required,
  error,
  hint,
  disabled,
}: CategoryListProps) {
  const { get, post } = useFetchClient();
  const { initialData } = useCMEditViewDataManager();
  const { formatMessage } = useIntl();

  const toggleNotification = useNotification();

  const [errorMessage, setErrorMessage] = useState<string | undefined>(error);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [categoryData, setCategoryData] = useState<Array<CategoryModelType> | null>(null);

  // Set initial productData
  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const { data }: { data: Array<CategoryModelType> } = await get(
          `/commercetools/getAllCategories`
        );

        setCategoryData(data);
        setIsLoading(false);

        // Check if any category returned is the previously set category
        if (value && !data.some((category) => category.slug === value)) {
          setErrorMessage("The category doesn't exist anymore.");
          toggleNotification({
            type: 'softWarning',
            message: "This category doesn't exist anymore.",
            title: 'Warning:',
          });
          onChange({ target: { name, value: null } });
        }
      } catch (e) {
        console.error(e);
        setErrorMessage('Something went wrong with the Commercetools server.');
        setIsLoading(false);
        toggleNotification({
          type: 'warning',
          message: 'Something went wrong with the Commercetools server.',
          title: 'Error:',
        });
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
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
          setErrorMessage('This category page already exists.');
        }
      } catch (e) {
        console.error(e);
      }
    }

    if (value) {
      validateSlug(value);
    }
  }, [value]);

  return (
    <SingleSelect
      label={formatMessage(intlLabel)}
      name={name}
      required={required}
      placeholder={isLoading ? 'Loading...' : 'Select a category'}
      hint={hint}
      error={errorMessage}
      disabled={disabled || isLoading}
      value={value}
      onChange={(value: string) => onChange({ target: { name, value } })}
      onClear={() => onChange({ target: { name, value: null } })}
    >
      {categoryData?.map((category) => (
        <SingleSelectOption key={category.slug} value={category.slug}>
          {category.name}
        </SingleSelectOption>
      ))}
    </SingleSelect>
  );
}
