import { UiCard } from "@uireact/card"
import type { UiSpacingProps } from "@uireact/foundation";
import { UiSpacing, TextSize } from "@uireact/foundation"
import { UiIcon } from "@uireact/icons"
import { UiList, UiListItem } from "@uireact/list"
import { UiHeading, UiText, UiLink } from "@uireact/text"

import { SignUpProgressIndicator } from "./sign-up-progress-indicator"
import emailImage from '../../assets/email.png';
import { useOptionalUser } from "../../utils";
import { Link } from '@remix-run/react';

const cardSpacing: UiSpacingProps['margin'] = { top: 'five' };
const listSpacing: UiSpacingProps['padding'] = { left: 'five' };

export const ConfirmEmail = () => { 
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
          <img src={emailImage} alt="revisa tu correo" />
          {user && (
            <>
              <UiText align='center'>Revisa el correo:</UiText>
              <UiText align='center' fontStyle='bold'>{user.email}</UiText>
            </>
          )}
        </UiCard>
      </UiSpacing>
      <UiSpacing margin={cardSpacing}>
        <UiCard>
          <UiLink>
            <Link to='/houses/'>
              <UiIcon icon='Home' size={TextSize.xsmall} /> Ir al dashboard
            </Link>
          </UiLink>
        </UiCard>
      </UiSpacing>
      <UiSpacing margin={cardSpacing}>
        <UiCard category='tertiary'>
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
  )
}