import React from "react";

import {
  Field,
  FieldLabel,
  FieldHint,
  FieldError,
  Flex,
} from "@strapi/design-system";

import { useIntl } from "react-intl";

export default function ProductGrid({
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

  return (
    <Field name={name} id={name} error={error} hint={description}>
      <Flex justifyContent="space-between" paddingBottom={2}>
        <FieldLabel labelAction={labelAction} required={required}>
          {formatMessage(intlLabel)}
        </FieldLabel>
      </Flex>
      <h1>hey!!!!</h1>
      <FieldHint />
      <FieldError />
    </Field>
  );
}
