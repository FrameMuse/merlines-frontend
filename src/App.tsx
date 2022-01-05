import AdminView from "admin/AdminView"
import { getAccountMe } from "api/actions/account"
import ClientAPI from "api/client"
import Footer from "components/Footer/Footer"
import Header from "components/Header/Header"
import Main from "components/Main/Main"
import Subscribe from "components/Subscribe/Subscribe"
import ErrorView from "components/TechnicalPages/ErrorView"
import UserCabinet from "components/UserCabinet/UserCabinet"
import { PopupContainer } from "plugins/popup/src/container"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { Route, Switch } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import { loginUser } from "redux/reducers/user"

import Article from "./components/Article/Article"
import Blog from "./components/Blog/Blog"

function App() {
  useUserConnection()

  return (
    <Switch>
      <Route path="/admin"><AdminView /></Route>
      <Route>
        <Header />
        <main id="main-content" className="main">
          <AppRouter />
        </main>
        <Footer />
        <PopupContainer className="modal" />
        <ToastContainer />
      </Route>
    </Switch >
  )
}


function AppRouter() {
  return (
    <Switch>
      <Route path="/user"><UserCabinet /></Route>

      <Route path="/blog/article/:articleId" render={props => [<Article {...props.match.params} />, <Subscribe />]} />
      <Route path="/blog"><Blog /><Subscribe /></Route>
      <Route path="/" exact><Main /><Subscribe /></Route>



      <Route path="/error/:code" render={props => <ErrorView {...props.match.params} />} />
      <Route><ErrorView code="404" /></Route>
    </Switch>
  )
}


function useUserConnection() {
  const dispatch = useDispatch()
  useEffect(() => {
    if (!localStorage.getItem("token")) return

    ClientAPI
      .query(getAccountMe)
      .then(({ error, payload }) => {
        if (error || !payload || payload.error) return

        dispatch(loginUser(payload))
      })
  }, [dispatch])
}

export default App
