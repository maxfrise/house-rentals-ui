import { UiViewRow } from "@uireact/view";
import { UiFlexGrid, UiFlexGridItem } from "@uireact/flex";
import type { UiSpacingProps} from "@uireact/foundation";
import { Breakpoints, UiSpacing, UiViewport } from "@uireact/foundation";

import { Graphics } from '../components/dashboard';
import { Controls } from "~/components/controls";

const MainContentSpacing: UiSpacingProps['margin'] = { block: 'four' };

export default function HousesPage() {
  return (
    <>
      <UiViewRow centeredContent weight="50">
        <UiViewport criteria={'m|l|xl'}>
          <UiFlexGrid columnGap="five">
            <UiFlexGridItem>
              <UiSpacing margin={MainContentSpacing}>
                <Controls />
              </UiSpacing>
            </UiFlexGridItem>
            <UiFlexGridItem grow={1}>
              <UiSpacing margin={MainContentSpacing}>
                <Graphics />
              </UiSpacing>
            </UiFlexGridItem>
          </UiFlexGrid>
        </UiViewport>
        <UiViewport criteria={Breakpoints.SMALL}>
          <UiSpacing margin={MainContentSpacing}>
            <Graphics />
          </UiSpacing>
        </UiViewport>
      </UiViewRow>
      <UiViewport criteria={Breakpoints.SMALL}>
        <Controls />
      </UiViewport>
    </>
  );
}
