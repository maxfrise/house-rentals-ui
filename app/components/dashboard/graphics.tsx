import React from 'react';

import { Outlet } from "@remix-run/react";

import { UiCard } from '@uireact/card';

export const Graphics = () => {
  return (
    <UiCard>
      <Outlet />
    </UiCard>
  );
};