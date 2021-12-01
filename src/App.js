import { useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useQuery from './hooks/useQuery';
import routes from './routes';
import { convertIdToRoute } from './utils';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import PriceCalendar from './components/PriceCalendar/PriceCalendar';
import PriceCalendarDays from './components/PriceCalendar/PriceCalendarDays/PriceCalendarDays';
import SearchResult from './components/SearchResult/SearchResult';
import Lk from './components/Lk/Lk';
import Subscribe from './components/Subscribe/Subscribe';
import Footer from './components/Footer/Footer';
import Article from './components/Article/Article';
import articles from './components/Blog/BlogLoadedData/articles.json';
import Blog from './components/Blog/Blog';
import UpdAccessPopup from './components/UpdAccessPopup/UpdAccessPopup';
import UpdAccessPopupConfirm from './components/UpdAccessPopup/UpdAccessPopupConfirm';
import UpdAccessPopupReset from './components/UpdAccessPopup/UpdAccessPopupReset';
import UpdAccessPopupResetConfirm from './components/UpdAccessPopup/UpdAccessPopupResetConfirm';
import MobileTicketFilter from './components/MobileTicketFilter/MobileTicketFilter';
import Error404 from './components/TechnicalPages/Error404';
import { selectAccessData } from './reducers/accessDataSlice';
import { selectSearchResult } from './reducers/searchResultSlice';
// import { selectLkData } from './reducers/lkDataSlice';
import TicketRedirect from './components/TechnicalPages/TicketRedirect/TicketRedirect';
import LandingPage from './components/LandingPage/LandingPage';
import PrivacyPolicy from "./components/PrivacyPolicy/PrivacyPolicy";
import Partners from "./components/Partners/Partners";
import Advertising from "./components/Advertising/Advertising";
import About from "./components/About/About";
import AboutProject from "./components/AboutProject/AboutProject";
import FAQ from "./components/FAQ/FAQ";
import { CookiePolicy } from './components/CookiePolicy/CookiePolicy';

function App() {
  const accessData = useSelector(selectAccessData);
  // const lkData = useSelector(selectLkData);
  const query = useQuery();
  const { searchData: { tickets } } = useSelector(selectSearchResult);
  const searchData = useSelector(selectSearchResult);
  const [isOpenFilter, setIsOpenFilter] = useState(false);

  return (
    <>
      {/* <ScrollToTop> */}
      <Header />
      <ToastContainer />
      <main className="main">
        {searchData.isOpenRedirect && <TicketRedirect />}
        {tickets && isOpenFilter && <MobileTicketFilter setIsOpenFilter={setIsOpenFilter} />}
        <Switch>
          <Route exact path={routes.signup}>
            {(query.get('next') === routes.priceCalendar.air) && <PriceCalendar />}
            {(query.get('next') === routes.priceCalendar.train) && <PriceCalendar />}
            {(query.get('next') === routes.priceCalendar.bus) && <PriceCalendar />}
            {(query.get('next') === routes.priceCalendar.airDays) && <PriceCalendarDays />}
            {(query.get('next') === routes.priceCalendar.trainDays) && <PriceCalendarDays />}
            {(query.get('next') === routes.priceCalendar.busDays) && <PriceCalendarDays />}
            {(query.get('next') === routes.main) && <Main />}
            {(query.get('next') === routes.air) && <Main />}
            {(query.get('next') === routes.train) && <Main />}
            {(query.get('next') === routes.bus) && <Main />}
            {(query.get('next') === routes.searchResult) && <SearchResult />}
            <UpdAccessPopup active={true} />
            <Subscribe />
          </Route>
          <Route exact path={routes.login}>
            {(query.get('next') === routes.priceCalendar.air) && <PriceCalendar />}
            {(query.get('next') === routes.priceCalendar.train) && <PriceCalendar />}
            {(query.get('next') === routes.priceCalendar.bus) && <PriceCalendar />}
            {(query.get('next') === routes.priceCalendar.airDays) && <PriceCalendarDays />}
            {(query.get('next') === routes.priceCalendar.trainDays) && <PriceCalendarDays />}
            {(query.get('next') === routes.priceCalendar.busDays) && <PriceCalendarDays />}
            {(query.get('next') === routes.main) && <Main />}
            {(query.get('next') === routes.air) && <Main />}
            {(query.get('next') === routes.train) && <Main />}
            {(query.get('next') === routes.bus) && <Main />}
            {(query.get('next') === routes.searchResult) && <SearchResult />}
            <UpdAccessPopup login={true} active={true} />
            <Subscribe />
          </Route>
          <Route path={`${routes.activate}/:uid/:token`}>
            <Main />
            <UpdAccessPopupConfirm />
            <Subscribe />
          </Route>
          <Route exact path={routes.resetPassword}>
            <UpdAccessPopupReset />
          </Route>
          <Route path={`${routes.resetPasswordConfirm}/:uid/:token`}>
            <UpdAccessPopupResetConfirm />
          </Route>
          <Route exact path={routes.main}>
            <Main />
            <Subscribe />
          </Route>
          <Route exact path={routes.bus}>
            <Main />
            <Subscribe />
          </Route>
          <Route exact path={routes.train}>
            <Main />
            <Subscribe />
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
            {
              accessData.loginToken
                ?
                <Lk />
                :
                <UpdAccessPopup login={true} active={true} />
            }
            <Subscribe />
          </Route>
          <Route path={routes.lk.history}>
            {
              accessData.loginToken
                ?
                <Lk />
                :
                <UpdAccessPopup login={true} active={true} />
            }
            <Subscribe />
          </Route>
          <Route path={routes.lk.subscribes}>
            {
              accessData.loginToken
                ?
                <Lk />
                :
                <UpdAccessPopup login={true} active={true} />
            }
            <Subscribe />
          </Route>
          <Route path={routes.lk.question}>
            {
              accessData.loginToken
                ?
                <Lk />
                :
                <UpdAccessPopup login={true} active={true} />
            }
            <Subscribe />
          </Route>
          <Route path={routes.lk.edit}>
            {
              accessData.loginToken
                ?
                <Lk />
                :
                <UpdAccessPopup login={true} active={true} />
            }
            <Subscribe />
          </Route>
          {articles.articles.map(section => section.items.map(item =>
            <Route path={convertIdToRoute(item.id)}>
              <Article articleData={item} />
              <Subscribe />
            </Route>
          ))}
          <Route path={routes.blog}>
            <Blog />
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
          <Route exact path={routes.landing.air}>
            <LandingPage />
            <Subscribe />
          </Route>
          <Route exact path={routes.landing.airDays}>
            <LandingPage />
            <Subscribe />
          </Route>
        </Switch>
      </main>
      <Footer />
       {/*<ScrollToTop/>*/}
    </>
  );
};

export default App;
