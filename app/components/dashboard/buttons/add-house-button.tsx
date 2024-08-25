import React from 'react';

import { Link } from '@remix-run/react';

import type { UiSpacingProps } from '@uireact/foundation';
import { UiSpacing } from '@uireact/foundation';
import { UiIcon } from '@uireact/icons';
import { UiLink } from '@uireact/text';

type AddHouseButtonProps = {
  padding: UiSpacingProps['padding']
};

export const AddHouseButton = ({ padding }: AddHouseButtonProps) => (
  <UiLink>
    <Link to="./new">
      <UiSpacing padding={padding}>
        <UiIcon icon='Add' /> Agregar casa
      </UiSpacing>
    </Link>
  </UiLink>
);