import { UiViewRow } from "@uireact/view";
import { UiFlexGrid, UiFlexGridItem } from "@uireact/flex";
import type { UiSpacingProps} from "@uireact/foundation";
import { Breakpoints, UiSpacing, UiViewport } from "@uireact/foundation";

import { Graphics } from '../components/dashboard';
import { Sidebar } from "~/components/sidebar";

const MainContentSpacing: UiSpacingProps['margin'] = { block: 'four' };
const RowSpacing: UiSpacingProps['margin'] = { left: 'three', right: 'three', top: 'five', bottom: 'seven' };

export default function HousesPage() {
  return (
    <>
      <UiViewRow centeredContent weight="50">
        <UiSpacing padding={RowSpacing}>
          <UiFlexGrid gap="five">
            <UiViewport criteria={"m|l|xl"}>
              <UiFlexGridItem>
                <UiSpacing margin={MainContentSpacing}>
                  <Sidebar />
                </UiSpacing>
              </UiFlexGridItem>
            </UiViewport>
            <UiFlexGridItem grow={1}>
              <UiSpacing padding={MainContentSpacing}>
                <Graphics />
              </UiSpacing>
            </UiFlexGridItem>
          </UiFlexGrid>
        </UiSpacing>
      </UiViewRow>
      <UiViewport criteria={Breakpoints.SMALL}>
        <Sidebar />
      </UiViewport>
    </>
  );
}
