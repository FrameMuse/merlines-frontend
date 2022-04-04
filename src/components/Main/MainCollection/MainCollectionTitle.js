import React from "react"

import useLocalization from "../../../plugins/localization/hook"

const MainCollectionTitle = () => {
  const ll = useLocalization(ll => ll)
  return (
    <header className="section__header">
      <h2 className="section__title">{ll.main.ourCollectionsTitle}</h2>
    </header>
  )
}

export default MainCollectionTitle
