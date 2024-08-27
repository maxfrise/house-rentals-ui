
import React from 'react';

import { Link } from '@remix-run/react';

/*
const LogoHeader = styled.h1`
  color: #B00202;
  font-size: 30px;
  font-family: 'Bebas Neue';
  line-height: 30px;
  transition: color 0.2s;

  :hover {
    color: #750303;
    text-shadow: black 0 0 1px;
  }
`;
*/

export const Logo = () => {
  return (
    <Link to="/" aria-label='Maxfrise, Regresar al inicio link'>
      <h1 aria-hidden>M a x f r i s e</h1>
    </Link>
  )
};
