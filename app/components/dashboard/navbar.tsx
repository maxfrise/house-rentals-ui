import React from 'react';
import { Link, useParams } from '@remix-run/react';

import styled from 'styled-components';

import { UiCard } from '@uireact/card';
import type { UiSpacingProps } from '@uireact/foundation';
import { UiSpacing , TextSize} from '@uireact/foundation';
import { UiIcon } from '@uireact/icons';
import { UiBadge } from '@uireact/badge';
import { UiText } from '@uireact/text';
import { UiNavbar, UiNavbarItem } from '@uireact/navbar';

import type { House } from '../../types';
import { UiFlexGrid, UiFlexGridItem } from '@uireact/flex-grid';

type NavbarProps = {
  houses?: House[];
}

const Div = styled.div`
  min-width: 300px;

  svg {
    display: inline-block;
    vertical-align: unset;
  }
`;

const StyledLink = styled(Link)`
  display: inline-block;
  width: 100%;
  padding: 5px;
`

const navbarSpacing: UiSpacingProps['margin'] = { block: 'three' };
const homeLinkSpacing: UiSpacingProps['margin'] = { left: 'four' };

export const Navbar: React.FC<NavbarProps> = ({ houses }: NavbarProps) => {
  const { houseId } = useParams();

  return (
    <Div>
      <>
        <UiCard>
          <StyledLink to="/houses">
            <UiSpacing margin={homeLinkSpacing}>
              <UiIcon icon='Home' /> Inicio
            </UiSpacing>
          </StyledLink>
        </UiCard>
          <UiSpacing margin={navbarSpacing}>
            <UiCard noPadding>
            {houses && houses.length > 0 ? (
              <UiNavbar orientation='stacked'>
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
        <UiCard>
          <StyledLink to="./new">
            <UiSpacing margin={homeLinkSpacing}>
              <UiIcon icon='Pages' /> Agregar casa
            </UiSpacing>
          </StyledLink>
        </UiCard>
      </>
    </Div>
  );
};
