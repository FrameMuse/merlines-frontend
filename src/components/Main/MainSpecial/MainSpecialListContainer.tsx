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
  if (payload == null) return <>No content</>

  const [bestSpecial, ...specials] = payload.results
  return (
    <div className="special__list">
      <MainSpecialCard
        isBest
        image="img/special/2.jpg"
        from={search.routes[0].origin?.title || ""}
        to={bestSpecial.destination.title}
        price={bestSpecial.price}
      />
      {specials.map((special, index) => (
        <MainSpecialCard
          from={search.routes[0].origin?.title || ""}
          to={special.destination.title}
          price={special.price}
          key={index}
        />
      ))}
    </div>
  )
}

export default MainSpecialListContainer
