const trainTicketsDataParser = (data) => {
  let allDurations = []

  let routes = {
    search_id: data[0][0].search_id,
    tickets: [],
    filters: {
      duration: {
        min: Math.min(...allDurations),
        max: Math.max(...allDurations)
      }
    },
    durations: allDurations
  }

  data.forEach((sellerData) =>
    sellerData.forEach((chunk) => {
      // const chunk_id = chunk.chunk_id;
      const seller_name =
        chunk.gates_info &&
        chunk.gates_info[Object.keys(chunk.gates_info)[0]].label
      const seller_id =
        chunk.gates_info &&
        chunk.gates_info[Object.keys(chunk.gates_info)[0]].id
      // const filters_boundary = chunk.filters_boundary;
      const airports = chunk.airports
      const airlines = chunk.airlines

      chunk.proposals &&
        chunk.proposals.forEach((proposal) => {
          const departure_date = proposal.segment[0].flight[0].departure_date
          const departure_time = proposal.segment[0].flight[0].departure_time
          const arrival_date =
            proposal.segment[0].flight[proposal.segment[0].flight.length - 1]
              .arrival_date
          const arrival_time =
            proposal.segment[0].flight[proposal.segment[0].flight.length - 1]
              .arrival_time
          const hash =
            departure_date + departure_time + arrival_date + arrival_time
          const seller_price =
            proposal.terms[Object.keys(proposal.terms)[0]].price
          const seller_url = proposal.terms[Object.keys(proposal.terms)[0]].url
          const flight_baggage =
            proposal.terms[Object.keys(proposal.terms)[0]].flights_baggage[0][0]
          const flights_handbags =
            proposal.terms[Object.keys(proposal.terms)[0]]
              .flights_handbags[0][0]
          const carriers = proposal.carriers.map((carrier) => {
            return { id: carrier, name: airlines[carrier].name }
          })
          const total_duration = proposal.total_duration
          allDurations.push(total_duration)

          let flightCodes = []
          proposal.segment.forEach((segmentItem) => {
            segmentItem.flight.forEach((flightItem) => {
              flightCodes.push(
                `${flightItem.trip_class}${flightItem.operated_by}${flightItem.number}`
              )
            })
          })

          const voyages = proposal.segment[0].flight.map((voyage) => {
            let flightCode = `${voyage.trip_class}${voyage.operated_by}${voyage.number}`
            let flightInfoByFlightCode
            if (chunk?.flight_info.hasOwnProperty(flightCode)) {
              flightInfoByFlightCode = chunk.flight_info[flightCode]
            }

            return {
              carrier_id: voyage.operated_by,
              airline_name: chunk?.airlines[voyage.operated_by]?.name,
              id: voyage.aircraft,
              duration: voyage.duration,
              departure_date: voyage.departure_date,
              departure_time: voyage.departure_time,
              arrival_date: voyage.arrival_date,
              arrival_time: voyage.arrival_time,
              departure_point_name: `${airports[voyage.departure].city}, ${
                airports[voyage.departure].name
              }`,
              departure_point_name_airport: airports[voyage.departure].name,
              departure_point_name_cases: airports[voyage.departure].cases,
              departure_point_id: voyage.departure,
              arrival_point_name: `${airports[voyage.arrival].city}, ${
                airports[voyage.arrival].name
              }`,
              arrival_point_name_airport: airports[voyage.arrival].name,
              arrival_point_name_cases: airports[voyage.arrival].cases,
              arrival_point_id: voyage.arrival,
              flight_info: flightInfoByFlightCode,
              flight_class: voyage.trip_class,
              flight_number: `${voyage.operated_by}-${voyage.number}`,
              flight_baggage: flight_baggage,
              flights_handbags: flights_handbags
            }
          })

          const transfers = proposal.segment[0].transfers?.map((transfer) => {
            const at = transfer.at
            const duration_seconds = transfer.duration_seconds
            return {
              at,
              duration_seconds
            }
          })

          const routeIndexByHash = routes.tickets.findIndex(
            (route) => route.hasOwnProperty("hash") && route.hash === hash
          )
          if (routeIndexByHash === -1) {
            routes.tickets.push({
              hash: hash,
              departure_date: departure_date,
              departure_time: departure_time,
              arrival_date: arrival_date,
              arrival_time: arrival_time,
              sellers: [
                {
                  name: seller_name,
                  id: seller_id,
                  price: seller_price,
                  link: seller_url
                }
              ],
              carriers: carriers,
              duration: total_duration,
              voyages: voyages,
              transfers: transfers
              // filters: filters_boundary,
            })
          } else {
            routes.tickets[routeIndexByHash].sellers.push({
              name: seller_name,
              id: seller_id,
              price: seller_price,
              link: seller_url
            })
          }
        })
    })
  )

  return routes
}

export default trainTicketsDataParser
