import React from 'react';
import { Link } from '@remix-run/react';

import styled from 'styled-components';

import { UiCard } from '@uireact/card';
import { UiList, UiListItem } from '@uireact/list';
import type { UiSpacingProps } from '@uireact/foundation';
import { UiSpacing , TextSize} from '@uireact/foundation';
import { UiIcon } from '@uireact/icons';
import { UiBadge } from '@uireact/badge';

import type { House } from '../../types';
import { UiText } from '@uireact/text';

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
`

const navbarSpacing: UiSpacingProps['margin'] = { block: 'three' };
const homeLinkSpacing: UiSpacingProps['margin'] = { left: 'four' };

export const Navbar: React.FC<NavbarProps> = ({ houses }: NavbarProps) => {
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
        {houses && houses.length > 0 && (
          <UiSpacing margin={navbarSpacing}>
            <UiCard>
              <UiList>
                {houses?.map((house, index) => (
                  <UiListItem key={index}>
                    {(index === houses.length - 1) && <hr />}
                    <StyledLink to={house.houseId}>
                      {`${house.houseFriendlyName} `}
                      {house.leaseStatus === 'AVAILABLE' ? (
                        <UiBadge category='primary' size={TextSize.xsmall}>Disponible</UiBadge>
                      ): (
                        <UiBadge category='positive' size={TextSize.xsmall}>Rentada</UiBadge>
                      )}
                    </StyledLink>
                  </UiListItem>
                ))}
              </UiList>
            </UiCard>
          </UiSpacing>
        )}
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
