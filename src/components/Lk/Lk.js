import "./cabinet.scss"

import React from "react"

import { lkNavConfig } from "../../constants"
import LkClearHistory from "./LkClearHistory"
import LkContent from "./LkContent/LkContent"
import LkHeader from "./LkHeader/LkHeader"
import LkNavigationItem from "./LkNavigation/LkNavigationItem"

function Lk() {
  return (
    <>
      <section className="cabinet">
        <div className="cabinet__container">
          <LkHeader />
          <div className="cabinet__inner">
            <div className="cabinet__col cabinet__col--nav">
              <nav className="cabinet__nav">
                {lkNavConfig.map((item, index) => (
                  <LkNavigationItem
                    key={index}
                    itemName={item.itemName}
                    itemSvg={item.svgName}
                    itemRoute={item.route}
                  />
                ))}
              </nav>
            </div>
            <LkContent />
          </div>
        </div>
      </section>
      <LkClearHistory />
    </>
  )
}

export default Lk
