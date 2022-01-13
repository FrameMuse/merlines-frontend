import AdminView from "admin/AdminView"
import { getAccountMe } from "api/actions/account"
import ClientAPI from "api/client"
import Footer from "components/Footer/Footer"
import Header from "components/Header/Header"
import Main from "components/Main/Main"
import PopupPasswordResetConfirm from "components/Popups/PopupPasswordResetConfirm"
import SearchResult from "components/SearchResult/SearchResult"
import Subscribe from "components/Subscribe/Subscribe"
import ErrorView from "components/TechnicalPages/ErrorView"
import UserCabinet from "components/UserCabinet/UserCabinet"
import { Popup, PopupContainer } from "plugins/popup"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { Route, Switch, useHistory, useLocation } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import { loginUser } from "redux/reducers/user"

import Article from "./components/Article/Article"
import Blog from "./components/Blog/Blog"

function App() {
  useUserAuth()
  useOpenPopup()

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

      <Route path="/search" exact><SearchResult /><Subscribe /></Route>


      <Route path="/error/:code" render={props => <ErrorView {...props.match.params} />} />
      <Route><ErrorView code="404" /></Route>
    </Switch>
  )
}


function useUserAuth() {
  const token = useUserToken()
  const dispatch = useDispatch()

  // Token just for update
  useEffect(() => {
    if (!token?.length) return

    localStorage.setItem("token", token)
    ClientAPI
      .query(getAccountMe) // Token is taken from localStorage in requestInterceptor
      .then(({ error, payload }) => {
        if (error || !payload || payload.error) return

        dispatch(loginUser(payload))
      })
  }, [token])
}

function useUserToken() {
  const history = useHistory()
  const location = useLocation()

  const [token, setToken] = useState<string | null>(localStorage.getItem("token"))

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const searchToken = searchParams.get("token")
    setToken(searchToken)

    if (searchToken === null) return
    if (searchToken.length === 0) {
      history.replace("/error/500")
      return
    }

    history.replace(location.pathname)
  }, [history, location])

  return token
}

function useOpenPopup() {
  const history = useHistory()
  const location = useLocation()

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const session = searchParams.get("password_session")

    if (session === null) return
    if (session.length === 0) {
      history.replace("/error/500")
      return
    }

    history.replace("/")
    Popup.open(PopupPasswordResetConfirm, { session })
  }, [location.search])
}

export default App
