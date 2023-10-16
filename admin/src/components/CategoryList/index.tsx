import React, { useState, useEffect } from 'react';

import { useFetchClient, useNotification } from '@strapi/helper-plugin';

import { SingleSelect, SingleSelectOption } from '@strapi/design-system';

type CategoryListProps = {
  onChange: (event: { target: { name: string; value?: string | null; type?: string } }) => void;
  name: string;
  description?: string;
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
  name,
  onChange,
  value,
  required,
  error,
  description,
  disabled,
}: CategoryListProps) {
  const { get } = useFetchClient();

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

  return (
    <SingleSelect
      label={name}
      required={required}
      placeholder={isLoading ? 'Loading...' : 'Select a category'}
      hint={description}
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
