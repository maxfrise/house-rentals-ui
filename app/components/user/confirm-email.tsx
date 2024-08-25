import { Link } from '@remix-run/react';

import { UiCard } from "@uireact/card"
import type { UiSpacingProps } from "@uireact/foundation";
import { UiSpacing, TextSize } from "@uireact/foundation"
import { UiIcon } from "@uireact/icons"
import { UiList, UiListItem } from "@uireact/list"
import { UiHeading, UiText, UiLink } from "@uireact/text"

import { SignUpProgressIndicator } from "./sign-up-progress-indicator"
import emailImage from '../../assets/email.png';
import { useOptionalUser } from "../../utils";

import styles from './confirm.module.css';
import { UiFlexGrid } from '@uireact/flex';
import { UiReactHoverElevate } from '@uireact/framer-animations';

const cardSpacing: UiSpacingProps['margin'] = { top: 'five' };
const listSpacing: UiSpacingProps['padding'] = { left: 'five' };

export const ConfirmEmail = () => { 
  const user = useOptionalUser();

  return (
    <div>
      <SignUpProgressIndicator currentIndex={3} />
      <UiSpacing margin={cardSpacing}>
        <UiCard category="primary">
          <UiHeading level={1}>Listo!</UiHeading>
          <UiText>
            Tu cuenta se a creado con exito, revisa tu correo te hemos enviado un correo para verificar tu correo.
          </UiText>
        </UiCard>
      </UiSpacing>
      <UiSpacing margin={cardSpacing}>
        <UiCard category="primary">
          <img src={emailImage} alt="revisa tu correo" className={styles.sticker} />
          {user && (
            <>
              <UiText align='center'>Revisa el correo:</UiText>
              <UiText align='center' fontStyle='bold'>{user.email}</UiText>
            </>
          )}
        </UiCard>
      </UiSpacing>
      <UiSpacing margin={cardSpacing}>
        <UiCard padding={{}} motion={UiReactHoverElevate}>
          <UiLink padding={{ block: 'four', inline: 'three'}} className={styles.goToDashboardLink}>
            <Link to='/houses/'>
              <UiFlexGrid alignItems='center' gap='four'>
                <UiIcon icon='Home' size='large' inverseColoration /> 
                <UiText inverseColoration>
                  Ir al dashboard
                </UiText>
              </UiFlexGrid>
            </Link>
          </UiLink>
        </UiCard>
      </UiSpacing>
      <UiSpacing margin={cardSpacing}>
        <UiCard category='primary'>
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
    </div>
  )
}