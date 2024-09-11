import type { V2_MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { UiCard } from "@uireact/card";
import { UiFlexGrid } from "@uireact/flex";
import { UiLink } from "@uireact/text";
import { UiIcon } from "@uireact/icons";
import { UiReactHoverScaleUp, UiReactTapScaleDown } from "@uireact/framer-animations";

import { useOptionalUser } from "~/utils";
import styles from '../styles/hero.module.css';

export const meta: V2_MetaFunction = () => [{ title: "MaxFrise" }];

export default function Index() {
  const user = useOptionalUser();
  return (
    <main>
      <UiFlexGrid alignItems="center" justifyContent="center">
        <div className={styles.hero}>
          <img
            src="https://www.mothermag.com/wp-content/uploads/2019/03/jonklassen_mothermag-471.jpg"
            alt="Man reading a book"
            className={styles.portrait}
          />
          <div className={styles.action}>
            {user && (
              <UiCard padding={{}} category="primary" motion={{ ...UiReactHoverScaleUp, ...UiReactTapScaleDown }}>
                <UiLink className="cover" padding={{ block: 'three', inline: 'four'}} category="secondary">
                  <Link to="/houses">
                    <UiIcon icon="Building" category="secondary" /> ver casas de {user.email}
                  </Link>
                </UiLink>
              </UiCard>
            )}
          </div>
        </div>
      </UiFlexGrid>
    </main>
  );
}
