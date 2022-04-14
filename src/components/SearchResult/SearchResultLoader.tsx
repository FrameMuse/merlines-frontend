import useLocalization from "../../plugins/localization/hook"

function SearchResultLoader() {
  const ll = useLocalization(ll => ll)

  return (
    <section className="download">
      <div className="download__inner">
        <h2 className="download__title">{ll.searchResult.loaderTitle}</h2>
      </div>
      <div className="download__plane"></div>
    </section>
  )
}

export default SearchResultLoader
