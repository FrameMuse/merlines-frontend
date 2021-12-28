import { useState } from "react"
import { Action, useQuery } from "react-fetching-library"

function usePaginationQuery<T = any, R = any>(action: Action<T, R>, initFetch?: boolean) {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const response = useQuery(action, initFetch)
  const actions = {
    prevPage: () => setPage(page - 1),
    nextPage: () => setPage(page + 1),
  }

  return [response, actions]
}

export default usePaginationQuery
