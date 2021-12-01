import { useCallback, useState } from "react"

let idle = Object.freeze({ type: "Idle" })
let pending = Object.freeze({ type: "Pending" })

const useAction = (fn) => {
  let [response, setResponse] = useState(idle)

  let action = useCallback(
    (...args) => {
      setResponse(pending)
      return Promise.resolve(fn(...args))
        .then((result) => {
          setResponse({ type: "Success", result })
          return result
        })
        .catch((error) => {
          setResponse({ type: "Failure", error })
          throw error
        })
    },
    [fn]
  )

  return [response, action]
}

export default useAction
