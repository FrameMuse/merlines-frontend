import api from "api/api"
import { useDispatch, useSelector } from "react-redux"
import {
  selectSearchResult,
  setIsOpenRedirect,
  setTicketDilerName
} from "reducers/searchResultSlice"

function SearchResultTicketBuy({ link, ticketDealerName }) {
  const dataResult = useSelector(selectSearchResult)
  // console.log(`SID: ${dataResult.searchData.search_id}`);
  // console.log(`Link: ${link}`);
  const search_id = dataResult.searchData.search_id
  const dispatch = useDispatch()

  const getLink = async () => {
    // e.preventDefault();
    // console.log('hi');
    dispatch(setTicketDilerName(ticketDealerName))
    dispatch(setIsOpenRedirect(true))
    try {
      const regData = await api.getLink({ link, search_id })
      // console.log(link, search_id);
      console.log(regData.data)
      if (regData.data.status === "ok") {
        const redirectLink = () => {
          window.open(regData.data.data.url, "_blank")
          dispatch(setIsOpenRedirect(false))
        }
        setTimeout(redirectLink, 3000)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <button onClick={getLink} className="btn btn--sm" type="button">
      Выбрать
    </button>
  )
}

export default SearchResultTicketBuy
