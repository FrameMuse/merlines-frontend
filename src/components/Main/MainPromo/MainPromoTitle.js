import useLocalization from "../../../plugins/localization/hook"

function MainPromoTitle() {
  const ll = useLocalization(ll => ll)
  return <h2 className="advantages__title">{ll.main.searchWithConfidenceTitle}</h2>
}

export default MainPromoTitle
