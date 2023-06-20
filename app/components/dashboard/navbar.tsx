import React from 'react';
import { Link, useParams } from '@remix-run/react';

import styled from 'styled-components';

import { UiCard } from '@uireact/card';
import type { UiSpacingProps} from '@uireact/foundation';
import { UiSpacing, TextSize, UiViewport } from '@uireact/foundation';
import { UiBadge } from '@uireact/badge';
import { UiText } from '@uireact/text';
import { UiNavbar, UiNavbarItem } from '@uireact/navbar';
import { UiFlexGrid, UiFlexGridItem } from '@uireact/flex-grid';

import type { House } from '../../types';
import { AddHouseButton, HomeButton } from './buttons';

type NavbarProps = {
  houses?: House[];
}

const Div = styled.div`
  min-width: 300px;
`;

const StyledLink = styled(Link)`
  display: inline-block;
  width: 100%;
  padding: 5px;
`;

const navbarSpacing: UiSpacingProps['margin'] = { block: 'three' };
const linkSpacing: UiSpacingProps['padding'] = { block: 'two' };

export const Navbar: React.FC<NavbarProps> = ({ houses }: NavbarProps) => {
  const { houseId } = useParams();

  return (
    <Div>
      <>
        <UiViewport criteria={'l|xl'}>
          <UiCard>
            <HomeButton padding={linkSpacing} />
          </UiCard>
        </UiViewport>
        <UiSpacing margin={navbarSpacing}>
          <UiCard noPadding>
            {houses && houses.length > 0 ? (
              <UiNavbar orientation='stacked' roundedCorners>
                {houses?.map((house, index) => (
                  <UiNavbarItem key={index} active={houseId === house.houseId}>
                    <StyledLink to={house.houseId}>
                      <UiFlexGrid>
                        <UiFlexGridItem grow={1}>
                          {`${house.houseFriendlyName} `}
                        </UiFlexGridItem>
                        <UiFlexGridItem>
                          {house.leaseStatus === 'AVAILABLE' ? (
                            <UiBadge category='primary' size={TextSize.xsmall}>Disponible</UiBadge>
                          ) : (
                            <UiBadge category='positive' size={TextSize.xsmall}>Rentada</UiBadge>
                          )}
                        </UiFlexGridItem>
                      </UiFlexGrid>
                    </StyledLink>
                  </UiNavbarItem>
                ))}
              </UiNavbar>
            ) : (
            <UiText>Todavia no hay casas</UiText>   
            )}
          </UiCard>
        </UiSpacing>
        <UiViewport criteria={'l|xl'}>
          <UiCard>
            <AddHouseButton padding={linkSpacing} />
          </UiCard>
        </UiViewport>
      </>
    </Div>
  );
};
