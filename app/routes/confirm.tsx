import React from 'react';
import type { V2_MetaFunction} from '@remix-run/node';

import styled from 'styled-components';

import type { UiSpacingProps} from '@uireact/foundation';
import { Breakpoints, UiSpacing, UiViewport } from '@uireact/foundation';
import { UiViewRow } from '@uireact/view';

import { ConfirmEmail } from '../components/user';

export const meta: V2_MetaFunction = () => [{ title: "Verifica tu correo" }];

const selectorSpacing: UiSpacingProps['padding'] = { block: 'five' };
const contentSpacing: UiSpacingProps['padding'] = { all: 'five' };

const Div = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

export default function Confirm() {
  return (
    <>
      <UiViewRow weight='50' centeredContent>
        <UiViewport criteria={Breakpoints.SMALL}>
          <UiSpacing padding={contentSpacing}>
            <ConfirmEmail />
          </UiSpacing>
        </UiViewport>
        <UiViewport criteria={'m|l|xl'}>
          <UiSpacing padding={selectorSpacing}>
            <Div>
              <ConfirmEmail />
            </Div>
          </UiSpacing>
        </UiViewport>
      </UiViewRow>
    </>
  );
};
