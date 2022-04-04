import useLocalization from "../../../plugins/localization/hook"

function MainPromoSubtitle() {
  const ll = useLocalization(ll => ll)
  return (
    <p className="advantages__text">
      {ll.main.searchWithConfidenceSubtitle}
    </p>
  )
}

export default MainPromoSubtitle
