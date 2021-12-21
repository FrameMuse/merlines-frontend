import AdminView from "admin/AdminView"
import { getAccountMe } from "api/actions/account"
import ClientAPI from "api/client"
import DEPRECATED__App__ from "App.deprecated"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { Route, Switch } from "react-router-dom"
import { ToastContainer } from "react-toastify"
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
      <ToastContainer />
      <Switch>
        <Route path="/admin">
          <AdminView />
        </Route>
        <Route>
          <DEPRECATED__App__ />
        </Route>
      </Switch>
    </>
  )
}

export default App
