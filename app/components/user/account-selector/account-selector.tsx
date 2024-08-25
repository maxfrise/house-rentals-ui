import type { UiSpacingProps} from '@uireact/foundation';
import { UiSpacing, useViewport } from '@uireact/foundation';
import { UiGrid, UiGridItem } from '@uireact/grid';
import { UiHeading } from '@uireact/text';

import { AgencyAccountSelector } from './agency-account-selector';
import { IndividualAccountSelector } from './individual-account-selector';
import { SignUpProgressIndicator } from '../sign-up-progress-indicator';

const headingMargin: UiSpacingProps['margin'] = { block: 'five' };

export const AccountSelector = () => {
  const { isSmall } = useViewport();

  return (
    <div className='centeredPage'>
      <SignUpProgressIndicator currentIndex={1}/>
      <UiSpacing margin={headingMargin}>
        <UiHeading>Paso 1. Elige tu tipo de cuenta</UiHeading>
      </UiSpacing>
      <UiGrid cols={isSmall ? 1 : 2} colsGap='four' rowsGap='four'>
        <UiGridItem>
          <IndividualAccountSelector />
        </UiGridItem>
        <UiGridItem>
          <AgencyAccountSelector />
        </UiGridItem>
      </UiGrid>
    </div>
  )
};
