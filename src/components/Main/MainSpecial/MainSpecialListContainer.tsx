import { getSpecialsByCityIdByTransport } from "api/actions/specials"
import { useEffect } from "react"
import { QueryError, useQuery } from "react-fetching-library"
import { useSelector } from "react-redux"

import MainSpecialCard from "./MainSpecialCard"

function MainSpecialListContainer() {
  const search = useSelector(state => state.search)
  const response = useQuery(getSpecialsByCityIdByTransport(search.routes[0].origin?.id || -1, search.transport), false)
  const { error, loading, payload, query } = response
  if (error) {
    throw new QueryError("Error during sending or handling request", response)
  }
  useEffect(() => {
    if (search.routes[0].origin == null) return
    query()
  }, [search.routes[0].origin])

  if (loading) return <>Loading...</>
  if (payload?.results == null) return <>No content</>

  const [bestSpecial, ...specials] = payload.results
  return (
    <div className="special__list">
      <MainSpecialCard
        isBest
        image="img/special/2.jpg"
        origin={search.routes[0].origin}
        destination={bestSpecial.destination}
        price={bestSpecial.price}
      />
      {specials.map((special, index) => (
        <MainSpecialCard
          origin={search.routes[0].origin}
          destination={special.destination}
          price={special.price}
          key={index}
        />
      ))}
    </div>
  )
}

export default MainSpecialListContainer
