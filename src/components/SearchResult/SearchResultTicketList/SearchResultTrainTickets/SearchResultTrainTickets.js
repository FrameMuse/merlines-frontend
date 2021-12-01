import React from "react"
// import {useDispatch,} from "react-redux";

const SearchResultTrainTickets = () => {
  // const dispatch = useDispatch();
  // // const { searchData: { tickets } } = useSelector(selectSearchTrainTicketResult);
  //
  // useEffect(() => {
  //   // dispatch(setSearchData(trainTicketsDataParser(trainTicketsResult.result.data)))
  // }, [trainTicketsResult.result.data]);

  return (
    <>
      <div
        className="ticket-list__not-found"
        style={{ paddingBottom: "125px", justifyContent: "end" }}
      >
        <h2 style={{ width: "100%" }} className="ticket-list__title">
          Поиск билетов на поезда еще в разработке
        </h2>
        <p style={{ width: "100%" }} className="ticket-list__error-head">
          Мы работаем работаем над этим
        </p>
      </div>
      {/*<SearchResultTrainTicketList tickets={tickets} />*/}
    </>
  )
}

export default SearchResultTrainTickets
