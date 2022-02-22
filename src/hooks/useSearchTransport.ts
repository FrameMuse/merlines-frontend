import { Dispatch } from "react"
import { useDispatch, useSelector } from "react-redux"
import { SearchDetails, updateSearchTransport } from "redux/reducers/search"

function useSearchTransport(): [SearchDetails["transport"], Dispatch<SearchDetails["transport"]>] {
  const dispatch = useDispatch()
  const transport = useSelector(state => state.search.transport)
  const setTransport = (transport: SearchDetails["transport"]) => dispatch(updateSearchTransport(transport))

  return [transport, setTransport]
}

export default useSearchTransport
