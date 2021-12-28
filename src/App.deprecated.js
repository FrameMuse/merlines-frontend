import { useState } from "react"
import { useSelector } from "react-redux"
import { Redirect, Route, Switch } from "react-router-dom"

import About from "./components/About/About"
import AboutProject from "./components/AboutProject/AboutProject"
import Advertising from "./components/Advertising/Advertising"
import Article from "./components/Article/Article"
import Blog from "./components/Blog/Blog"
import { CookiePolicy } from "./components/CookiePolicy/CookiePolicy"
import FAQ from "./components/FAQ/FAQ"
import Footer from "./components/Footer/Footer"
import Header from "./components/Header/Header"
import LandingPage from "./components/LandingPage/LandingPage"
import Lk from "./components/Lk/Lk"
import Main from "./components/Main/Main"
import MobileTicketFilter from "./components/MobileTicketFilter/MobileTicketFilter"
import Partners from "./components/Partners/Partners"
import PriceCalendar from "./components/PriceCalendar/PriceCalendar"
import PrivacyPolicy from "./components/PrivacyPolicy/PrivacyPolicy"
import SearchResult from "./components/SearchResult/SearchResult"
import Subscribe from "./components/Subscribe/Subscribe"
import Error404 from "./components/TechnicalPages/Error404"
// import { selectLkData } from './reducers/lkDataSlice';
import TicketRedirect from "./components/TechnicalPages/TicketRedirect/TicketRedirect"
import UpdAccessPopup from "./components/UpdAccessPopup/UpdAccessPopup"
import UpdAccessPopupConfirm from "./components/UpdAccessPopup/UpdAccessPopupConfirm"
import UpdAccessPopupReset from "./components/UpdAccessPopup/UpdAccessPopupReset"
import UpdAccessPopupResetConfirm from "./components/UpdAccessPopup/UpdAccessPopupResetConfirm"
import { selectAccessData } from "./reducers/accessDataSlice"
import { selectSearchResult } from "./reducers/searchResultSlice"
import routes from "./routes"

function DEPRECATED__App__() {
  const accessData = useSelector(selectAccessData)
  const {
    searchData: { tickets }
  } = useSelector(selectSearchResult)
  const searchData = useSelector(selectSearchResult)
  const [isOpenFilter, setIsOpenFilter] = useState(false)
  return (
    <>
      {/* <ScrollToTop> */}
      <Header />
      <main id="main-content" className="main">
        {searchData.isOpenRedirect && <TicketRedirect />}
        {tickets && isOpenFilter && (
          <MobileTicketFilter setIsOpenFilter={setIsOpenFilter} />
        )}
        <Route path={`${routes.activate}/:uid/:token`}>
          <UpdAccessPopupConfirm />
        </Route>
        <Route exact path={routes.resetPassword}>
          <UpdAccessPopupReset />
        </Route>
        <Route path={`${routes.resetPasswordConfirm}/:uid/:token`}>
          <UpdAccessPopupResetConfirm />
        </Route>
        <Switch>
          <Route exact path={["/blog", "/blog/tag/:tag"]} render={props => (
            <>
              <Blog tag={props.match.params.tag} />
              <Subscribe />
            </>
          )} />
          <Route path="/blog/article/:articleId" render={props => <Article articleId={props.match.params.articleId} />} />
          <Route exact path={routes.signup}>
            <UpdAccessPopup active={true} />
          </Route>
          <Route exact path={routes.login}>
            <UpdAccessPopup login={true} active={true} />
            <Subscribe />
          </Route>
          <Route exact path={[routes.main, routes.bus, routes.train]}>
            <Main />
          </Route>
          <Route exact path={routes.priceCalendar.base}>
            <Redirect to={routes.priceCalendar.air} />
          </Route>
          <Route path={routes.priceCalendar.air}>
            <PriceCalendar />
            <Subscribe />
          </Route>
          <Route path={routes.priceCalendar.train}>
            <PriceCalendar />
            <Subscribe />
          </Route>
          <Route path={routes.priceCalendar.bus}>
            <PriceCalendar />
            <Subscribe />
          </Route>
          <Route path={routes.searchResult}>
            <SearchResult setIsOpenFilter={setIsOpenFilter} />
            <Subscribe />
          </Route>
          <Route exact path={routes.lk.base}>
            {accessData.loginToken ? (
              <Lk />
            ) : (
              <UpdAccessPopup login={true} active={true} />
            )}
            <Subscribe />
          </Route>
          <Route path={routes.lk.history}>
            {accessData.loginToken ? (
              <Lk />
            ) : (
              <UpdAccessPopup login={true} active={true} />
            )}
            <Subscribe />
          </Route>
          <Route path={routes.lk.subscribes}>
            {accessData.loginToken ? (
              <Lk />
            ) : (
              <UpdAccessPopup login={true} active={true} />
            )}
            <Subscribe />
          </Route>
          <Route path={routes.lk.question}>
            {accessData.loginToken ? (
              <Lk />
            ) : (
              <UpdAccessPopup login={true} active={true} />
            )}
            <Subscribe />
          </Route>
          <Route path={routes.lk.edit}>
            {accessData.loginToken ? (
              <Lk />
            ) : (
              <UpdAccessPopup login={true} active={true} />
            )}
            <Subscribe />
          </Route>
          <Route path={routes.footer.aboutUs}>
            <About />
          </Route>
          <Route path={routes.footer.aboutProject}>
            <AboutProject />
          </Route>
          <Route path={routes.footer.rules}>
            <Error404 />
          </Route>
          <Route path={routes.footer.cookies}>
            <CookiePolicy />
          </Route>
          <Route path={routes.footer.privacyPolicy}>
            <PrivacyPolicy />
          </Route>
          <Route path={routes.footer.advertising}>
            <Advertising />
          </Route>
          <Route path={routes.footer.priceList}>
            <Advertising />
          </Route>
          <Route path={routes.footer.forPartners}>
            <Partners />
          </Route>
          <Route path={routes.footer.help}>
            <Error404 />
          </Route>
          <Route path={routes.footer.faq}>
            <FAQ />
          </Route>
          <Route path={routes.footer.askQuestion}>
            <Error404 />
          </Route>
          <Route path={routes.footer.socialNetwork}>
            <Error404 />
          </Route>
          <Route path={routes.footer.instagram}>
            <Error404 />
          </Route>
          <Route path={routes.footer.facebook}>
            <Error404 />
          </Route>
          <Route path={routes.landing}>
            <LandingPage />
            <Subscribe />
          </Route>
        </Switch>
      </main>
      <Footer />
      {/*<ScrollToTop/>*/}
    </>
  )
}

export default DEPRECATED__App__
