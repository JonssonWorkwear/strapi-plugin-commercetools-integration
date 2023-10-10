import React, { useState, useEffect } from 'react';
import { useIntl, MessageDescriptor } from 'react-intl';

import { useFetchClient, useNotification } from '@strapi/helper-plugin';

import {
  SingleSelect,
  SingleSelectOption,
  Field,
  FieldLabel,
  FieldHint,
  FieldError,
  Flex,
} from '@strapi/design-system';

type CategoryListProps = {
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

  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  return (
    <SingleSelect
      label={name}
      required={required}
      placeholder="Choose one category"
      hint={description}
      error={error}
      disabled={disabled}
      value={value}
      onChange={(value: string) => onChange({ target: { name, value } })}
      onClear={() => onChange({ target: { name, value: null } })}
    >
      <SingleSelectOption value="apple">Apple</SingleSelectOption>
      <SingleSelectOption value="avocado">Avocado</SingleSelectOption>
      <SingleSelectOption value="banana">Banana</SingleSelectOption>
      <SingleSelectOption value="kiwi">Kiwi</SingleSelectOption>
      <SingleSelectOption value="mango">Mango</SingleSelectOption>
      <SingleSelectOption value="orange">Orange</SingleSelectOption>
      <SingleSelectOption value="strawberry">Strawberry</SingleSelectOption>
    </SingleSelect>
  );
}
