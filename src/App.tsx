import AdminView from "admin/AdminView"
import { getAccountMe } from "api/actions/account"
import ClientAPI from "api/client"
import ErrorView from "components/ErrorView/ErrorView"
import Footer from "components/Footer/Footer"
import Header from "components/Header/Header"
import LandingPage from "components/LandingPage/LandingPage"
import Main from "components/Main/Main"
import PopupPasswordResetConfirm from "components/Popups/PopupPasswordResetConfirm"
import PriceCalendar from "components/PriceCalendar/PriceCalendar"
import SearchResult from "components/SearchResult/SearchResult"
import Subscribe from "components/Subscribe/Subscribe"
import UserCabinet from "components/UserCabinet/UserCabinet"
import { Popup, PopupContainer } from "plugins/popup"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { Route, Switch, useHistory, useLocation } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import { loginUser } from "redux/reducers/user"
import routes from "routes"
import AboutView from "views/about/AboutView"
import CookiesView from "views/cookies/CookiesView"
import FAQView from "views/faq/FAQView"
import PartnersView from "views/partners/PartnersView"
import PriceListView from "views/price-list/PriceListView"
import PrivacyPolicyView from "views/privacy-policy/PrivacyPolicyView"
import RedirectView from "views/redirect/RedirectView"

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
          <AppRoutes />
        </main>
        <Footer />
        <PopupContainer className="modal" />
        <ToastContainer />
      </Route>
    </Switch >
  )
}


function AppRoutes() {
  return (
    <Switch>
      <Route path="/user"><UserCabinet /></Route>

      <Route path="/blog/article/:articleId" render={props => [<Article {...props.match.params} />, <Subscribe />]} />
      <Route path="/blog"><Blog /><Subscribe /></Route>

      <Route path="/price-calendar"><PriceCalendar /></Route>

      <Route path="/" exact><Main /><Subscribe /></Route>

      <Route path={[
        "/search/:transport/:routes/:passengers?/C:travelClass?",
        "/search/:transport/:routes/:passengers?",
      ]}><SearchResult /><Subscribe /></Route>

      <Route path={routes.footer.aboutUs}><AboutView /></Route>
      {/* <Route path={routes.footer.aboutProject}><AboutProject /></Route> */}
      {/* <Route path={routes.footer.rules}><ErrorView code="404" /></Route> */}
      {/* <Route path={routes.footer.cookies}><CookiesView /></Route> */}
      <Route path={routes.footer.privacyPolicy}><PrivacyPolicyView /></Route>
      {/* <Route path={routes.footer.advertising}><Advertising /></Route> */}
      {/* <Route path={routes.footer.priceList}><PriceListView /></Route> */}
      <Route path={routes.footer.forPartners}><PartnersView /></Route>
      <Route path={routes.footer.faq}><FAQView /></Route>
      <Route path={routes.landing}><LandingPage /><Subscribe /></Route>

      <Route path="/error/:code" render={props => <ErrorView {...props.match.params} />} />

      <Route path="/redirect"><RedirectView /></Route>
      <Route><ErrorView code="404" /></Route>
    </Switch >
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
