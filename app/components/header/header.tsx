import React from 'react';

import { UiButton } from '@uireact/button';
import { UiHeader } from '@uireact/header';
import { UiFlexGrid, UiFlexGridItem } from '@uireact/flex-grid';
import { UiHeading } from '@uireact/text';
import { UiIcon } from '@uireact/icons';

type HeaderProps = {
  toggleTheme?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ toggleTheme }: HeaderProps) => (
  <UiHeader centered>
    <UiFlexGrid>
      <UiFlexGridItem grow={1}>
        <UiHeading>Maxfrise</UiHeading>
      </UiFlexGridItem>
      {toggleTheme && (
        <UiButton onClick={toggleTheme}>
          <UiIcon icon='ColorDrop' />
        </UiButton>
      )}
    </UiFlexGrid>
  </UiHeader>
);

Header.displayName = 'Header';