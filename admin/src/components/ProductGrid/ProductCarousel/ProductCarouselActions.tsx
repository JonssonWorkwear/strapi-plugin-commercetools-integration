import React from 'react';

import { CarouselActions, IconButton } from '@strapi/design-system';
import { Pencil, Trash } from '@strapi/icons';

type ProductCarouselActionsProps = {
  openModal: () => void;
  onDelete: () => void;
  disabled?: boolean;
};

export function ProductCarouselActions({
  openModal,
  onDelete,
  disabled,
}: ProductCarouselActionsProps) {
  return (
    <CarouselActions style={{ cursor: disabled ? 'not-allowed' : 'pointer' }}>
      <IconButton
        onClick={openModal}
        label="Edit"
        aria-label="Edit"
        id="edit"
        icon={<Pencil />}
        disabled={disabled}
      />
      <IconButton
        onClick={onDelete}
        label="Delete"
        aria-label="Delete"
        id="delete"
        icon={<Trash />}
        disabled={disabled}
      />
    </CarouselActions>
  );
}
