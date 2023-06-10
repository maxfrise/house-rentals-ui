import React from 'react';

import { Link } from '@remix-run/react';

import styled from 'styled-components';

import type { UiSpacingProps } from '@uireact/foundation';
import { UiSpacing } from '@uireact/foundation';
import { UiIcon } from '@uireact/icons';

const StyledLink = styled(Link)`
  display: inline-block;
  width: 100%;
  padding: 5px;

  svg {
    display: inline;
    vertical-align: unset;
  }
`;
const linkSpacing: UiSpacingProps['margin'] = { left: 'four' };

export const AddHouseButton = () => (
  <StyledLink to="./new">
    <UiSpacing margin={linkSpacing}>
      <UiIcon icon='Pages' /> Agregar casa
    </UiSpacing>
  </StyledLink>
);