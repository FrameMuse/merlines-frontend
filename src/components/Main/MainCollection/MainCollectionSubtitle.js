import React from "react"

import useLocalization from "../../../plugins/localization/hook"

const MainCollectionSubtitle = () => {
  const ll = useLocalization(ll => ll)
  return (
    <p className="section__text">
      {ll.main.ourCollectionsSubtitle}
    </p>
  )
}

export default MainCollectionSubtitle
