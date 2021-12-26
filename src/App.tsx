import AdminView from "admin/AdminView"
import { getAccountMe } from "api/actions/account"
import ClientAPI from "api/client"
import DEPRECATED__App__ from "App.deprecated"
import { useEffect } from "react"
import ReactGA from "react-ga"
import { useDispatch } from "react-redux"
import { Route, Switch, useHistory } from "react-router-dom"
import { loginUser } from "redux/reducers/user"

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    ClientAPI
      .query(getAccountMe)
      .then(({ error, payload }) => {
        if (error || !payload || payload.error) return

        dispatch(loginUser(payload))
      })
  }, [dispatch])

  return (
    <>
      <Switch>
        <Route path="/admin">
          <AdminView />
        </Route>
        <Route>
          {/* <GoogleAnalytics /> */}
          <DEPRECATED__App__ />
        </Route>
      </Switch>
    </>
  )
}


// const DEFAULT_CONFIG = {
//   trackingId: 3118097372,
//   debug: true,
//   gaOptions: {
//     cookieDomain: "none"
//   }
// }

// function GoogleAnalytics() {
//   const history = useHistory()

//   useEffect(() => {
//     ReactGA.initialize("G-NC9LWLE6E1")

//     history.listen(location => {
//       ReactGA.set({
//         ...DEFAULT_CONFIG,
//         page: location.pathname + location.search
//       })
//       ReactGA.pageview(location.pathname + location.search)
//     })
//   }, [history])

//   return null
// }

export default App
