import React from "react"
import { lkNavConfig } from "../../constants"
import LkNavigationItem from "./LkNavigation/LkNavigationItem"
import LkHeader from "./LkHeader/LkHeader"
import LkContent from "./LkContent/LkContent"
import LkClearHistory from "./LkClearHistory"
import "./cabinet.scss"

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
