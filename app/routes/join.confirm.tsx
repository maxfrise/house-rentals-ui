import React from 'react';

import styled from 'styled-components';

import { UiCard } from '@uireact/card';
import type { UiSpacingProps } from '@uireact/foundation';
import { TextSize } from '@uireact/foundation';
import { UiSpacing } from '@uireact/foundation';
import { UiIcon } from '@uireact/icons';
import { UiList, UiListItem } from '@uireact/list';
import { UiHeading, UiLink, UiText } from '@uireact/text';

import { SignUpProgressIndicator } from '../components/user/sign-up-progress-indicator';
import { useOptionalUser } from '../utils';
import emailImage from '../assets/email.png';

const cardSpacing: UiSpacingProps['margin'] = { top: 'five' };
const listSpacing: UiSpacingProps['padding'] = { left: 'five' };

const Img = styled.img`
  max-width: 150px;
  margin: 0 auto;
  display: block;
`

export default function JoinConfirm() {
  const user = useOptionalUser();

  return (
    <>
      <SignUpProgressIndicator currentIndex={3} />
      <UiSpacing margin={cardSpacing}>
        <UiCard>
          <UiHeading level={1}>Listo!</UiHeading>
          <UiText>
            Tu cuenta se a creado con exito, revisa tu correo te hemos enviado un correo para verificar tu correo.
          </UiText>
        </UiCard>
      </UiSpacing>
      <UiSpacing margin={cardSpacing}>
        <UiCard>
          <Img src={emailImage} alt="revisa tu correo" />
          {user && (
            <>
              <UiText centered>Revisa el correo:</UiText>
              <UiText centered fontStyle='bold'>{user.email}</UiText>
            </>
          )}
        </UiCard>
      </UiSpacing>
      <UiSpacing margin={cardSpacing}>
        <UiCard>
          <UiLink href='/houses/' useReactLink>
            <UiIcon icon='House2' size={TextSize.xsmall} /> Ir al dashboard 
          </UiLink>
        </UiCard>
      </UiSpacing>
      <UiSpacing margin={cardSpacing}>
        <UiCard theme='tertiary'>
          <UiHeading>Unos tips de seguridad</UiHeading>
          <UiSpacing padding={listSpacing}>
            <UiList type='BULLETED'>
              <UiListItem>Nunca dejes tu cuenta abierta en computadoras publicas</UiListItem>
              <UiListItem>Revisa siempre que el dominio sea: <UiText fontStyle='bold' inline>https://maxfrise.com</UiText></UiListItem>
              <UiListItem>Nosotros NUNCA te pediremos tu contraseña por correo, mensaje o llamada</UiListItem>
              <UiListItem>Nunca escribas tus contraseñas en papeles!!</UiListItem>
            </UiList>
          </UiSpacing>
        </UiCard>
      </UiSpacing>
    </>
  );
};
