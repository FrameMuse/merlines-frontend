import {getFavourites} from "api/actions/favourites"
import SearchResultAirTicket
  from "components/SearchResult/SearchResultContainers/SearchResultAirContainer/SearchResultAirTicket"
import {useEffect, useState} from "react"
import {useQuery} from "react-fetching-library"
import {useSelector} from "react-redux"
import {classWithModifiers} from "utils"

import {AirTicketType} from "../../../interfaces/Search"


function UserCabinetFavourites() {
  const transport = useSelector(state => state.search.transport)

  const [page, setPage] = useState(1)
  const [pageSize] = useState(5)
  const [results, setResults] = useState<AirTicketType[]>([])
  const { error, loading, payload } = useQuery(getFavourites(transport, page, pageSize), true)

  useEffect(() => {
    if (!payload) return
    if (page > 1) {
      setResults(results => [...results, ...payload.results])
      return
    }
    setResults(payload.results)
  }, [payload])

  if (error) throw new Error("useQuery error")
  if (loading) return <>loading...</>
  if (!payload) return <>no content</>


  return (
    <>
      <div className="cabinet__col-wrap cabinet__col-wrap--subscription">
        <h2 className="cabinet__title">Избраное</h2>
        {/* <UserCabinetSwitcher basename="/user/favourites" /> */}
      </div>
      <div className={classWithModifiers("ticket-list__content", loading && "loading")}>
        {results.map(ticket => (
          <SearchResultAirTicket {...ticket} key={ticket.id} />
        ))}
        {(page * pageSize) <= payload.count && (
          <button className="ticket-list__more" type="button" onClick={() => setPage(page + 1)}>Загрузить ещё {pageSize} билетов</button>
        )}
      </div>
      {payload.results.length === 0 && (
        <div className="cabinet__empty cabinet__empty--subscription">
          <h3 className="cabinet__empty-text">В данном разделе пока пусто</h3>
        </div>
      )}
      {/* <div className="cabinet__empty cabinet__empty--subscription">
        <Switch>
          <Redirect from="/user/favourites" to="/user/favourites/routes" exact />
          <Route path="/routes">
            {payload.results}
            <h3 className="cabinet__empty-text">В данном разделе пока пусто</h3>
          </Route>
          <Route path="/tickets">
            <h3 className="cabinet__empty-text">В данном разделе пока пусто</h3>
          </Route>
        </Switch>
      </div> */}
    </>
  )
}

export default UserCabinetFavourites
