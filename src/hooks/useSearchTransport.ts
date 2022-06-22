import { stringifySearchData } from "components/SearchForm/SearchForm.utils"
import { Dispatch } from "react"
import { useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { SearchDetails } from "redux/reducers/search"

function useSearchTransport(): [SearchDetails["transport"], Dispatch<SearchDetails["transport"]>] {
  const history = useHistory()
  const search = useSelector(state => state.search)
  function setTransport(transport: SearchDetails["transport"]) {
    history.push({ pathname: stringifySearchData({ ...search, transport }) })
  }

  return [search.transport, setTransport]
}

export default useSearchTransport
