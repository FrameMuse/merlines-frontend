import { useState } from "react"
import { useSelector } from "react-redux"
import { Redirect, Route, Switch } from "react-router-dom"

import About from "./components/About/About"
import AboutProject from "./components/AboutProject/AboutProject"
import Advertising from "./components/Advertising/Advertising"
import { CookiePolicy } from "./components/CookiePolicy/CookiePolicy"
import FAQ from "./components/FAQ/FAQ"
import Footer from "./components/Footer/Footer"
import Header from "./components/Header/Header"
import LandingPage from "./components/LandingPage/LandingPage"
import Main from "./components/Main/Main"
import MobileTicketFilter from "./components/MobileTicketFilter/MobileTicketFilter"
import Partners from "./components/Partners/Partners"
import PopupResetConfirm from "./components/Popups/PopupPasswordResetConfirm"
import PriceCalendar from "./components/PriceCalendar/PriceCalendar"
import PrivacyPolicy from "./components/PrivacyPolicy/PrivacyPolicy"
import SearchResult from "./components/SearchResult/SearchResult"
import Subscribe from "./components/Subscribe/Subscribe"
import ErrorView from "./components/TechnicalPages/ErrorView"
// import { selectLkData } from './reducers/lkDataSlice';
import TicketRedirect from "./components/TechnicalPages/TicketRedirect/TicketRedirect"
import { selectSearchResult } from "./reducers/searchResultSlice"
import routes from "./routes"

function DEPRECATED__App__() {
  const { searchData: { tickets } } = useSelector(selectSearchResult)
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
        <Route path={`${routes.resetPasswordConfirm}/:uid/:token`}>
          <PopupResetConfirm />
        </Route>
        <Switch>
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
          <Route path={routes.footer.aboutUs}>
            <About />
          </Route>
          <Route path={routes.footer.aboutProject}>
            <AboutProject />
          </Route>
          <Route path={routes.footer.rules}>
            <ErrorView />
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
          <Route path={routes.footer.faq}>
            <FAQ />
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
