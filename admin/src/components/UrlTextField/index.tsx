import React, { useState, useEffect } from 'react';
import { useIntl, MessageDescriptor } from 'react-intl';

import { TextInput, Flex, IconButton } from '@strapi/design-system';

import { useCMEditViewDataManager, useFetchClient } from '@strapi/helper-plugin';

import { Link } from '@strapi/icons';

type UrlTextFieldProps = {
  contentTypeUID: string;
  intlLabel: MessageDescriptor;
  onChange: (event: { target: { name: string; value?: string | null; type?: string } }) => void;
  name: string;
  error?: string;
  labelAction?: React.ReactNode;
  required?: boolean;
  value?: string;
  hint?: string;
};

export function UrlTextField({
  contentTypeUID,
  intlLabel,
  name,
  hint,
  onChange,
  value,
  labelAction,
  required,
  error,
}: UrlTextFieldProps) {
  const { formatMessage } = useIntl();

  const { modifiedData } = useCMEditViewDataManager();

  const { post } = useFetchClient();

  const [errorMessage, setErrorMessage] = useState<string | undefined>(error);

  useEffect(() => {
    async function fetchData(contentTypeUID: string, modifiedData: any) {
      try {
        const { data } = await post(`/commercetools/url/generate`, {
          contentTypeUID,
          data: modifiedData,
        });
        onChange({ target: { name, value: data } });
      } catch (e) {
        console.error(e);
        setErrorMessage('Something went wrong parsing the URL');
      }
    }

    if (modifiedData) {
      fetchData(contentTypeUID, modifiedData);
    } else {
      setErrorMessage('Something went wrong parsing the URL');
    }
  }, [modifiedData]);

  return (
    <>
      <TextInput
        placeholder="https://"
        label={formatMessage(intlLabel)}
        name={name}
        hint={
          hint ||
          "This field is automatically generated based on the page data. To see the changes you've made, save/publish the page first."
        }
        value={value}
        error={!!errorMessage ? errorMessage : undefined}
        required={required}
        disabled
        endAction={
          <>
            <Flex gap={2}>
              <IconButton
                onClick={() => navigator.clipboard.writeText(value || '')}
                label="Copy"
                icon={<Link />}
              />
              <IconButton onClick={() => window.open(value)} label="Open" icon={<>↗</>} />
            </Flex>
          </>
        }
      />
    </>
  );
}
