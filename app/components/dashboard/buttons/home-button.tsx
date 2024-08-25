import React from 'react';

import { Link } from '@remix-run/react';

import type { UiSpacingProps } from '@uireact/foundation';
import { UiSpacing } from '@uireact/foundation';
import { UiIcon } from '@uireact/icons';
import { UiLink } from '@uireact/text';

type HomeButtonProps = {
  padding: UiSpacingProps['padding']
};

export const HomeButton = ({ padding }: HomeButtonProps) => (
  <UiLink>
    <Link to="/houses">
      <UiSpacing padding={padding}>
        <UiIcon icon='Home' /> Inicio
      </UiSpacing>
    </Link>
  </UiLink>
);