import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useClickAway } from 'react-use';
import { DateTime } from 'luxon';
import {
  selectMainSearchParams,
  setPassengersInfo,
  setPassengersInfoMini,
  setRouteFrom,
  setRouteTo,
  setOneWay,
  setDateTo,
  setDateFrom,
  setChangedInputTo,
  detectCityByGeoIp,
  setChangedInputFrom
} from '../../reducers/mainSearchSlice';
import {
  setIsOpenCalendar,
  selectDropDownCalendar,
  setCalendarToInitial,
  setIsOneClick,
  setIsDateInterval,
  setDateIntervalFrom
} from '../../reducers/dropDownCalendarSlice';
import { setSearchData } from '../../reducers/searchResultSlice';
import { pluralize } from '../../utils';
import api from '../../api/api';
import useDebounce from '../../hooks/useDebounce';
import DropDown from '../DropDown/DropDown';
import DropDownCalendar from '../DropDownCalendar/DropDownCalendar';
import DropDownPassengers from '../DropDownPassengers/DropDownPassengers';
import { selectAccessData } from '../../reducers/accessDataSlice';
import OpenBooking from '../common/OpenBooking';
import { monthNamesDate } from '../../constants';
import { firstToUpperCase } from '../../utils';
import './form.scss'

function SearchForm({ searchResult }) {
  const [isOffsetCal, setIsOffsetCal] = useState(false);
  const dateToInput = useRef(null);
  const dateFromInput = useRef(null);
  const history = useHistory();
  const dispatch = useDispatch();
  const mainSearchParams = useSelector(selectMainSearchParams);
  const dropDownCal = useSelector(selectDropDownCalendar);
  const [inputValue, setInputValue] = useState('');
  const [currentCitiesData, setCurrentCitiesData] = useState('');
  const [historyCitiesData, setHistoryCitiesData] = useState({
    from: [],
    to: []
  });
  const [inputDirection, setInputDirection] = useState('');
  const inputEl = useRef(null);
  const debouncedSearchInput = useDebounce(inputValue, 500);
  const [passengersAmount, setPassengersAmount] = useState(1);
  const [isPassengersOpen, setIsPassengersOpen] = useState(false);
  const [formError, setFormError] = useState(false);
  const accessData = useSelector(selectAccessData);

  const node = useRef();
  const nodeDropDown = useRef();
  const nodeDropDown2 = useRef();

  useEffect(() => {
    const cityApiFrom = sessionStorage.getItem('cityApiFrom');
    const cityFrontFrom = sessionStorage.getItem('cityFrontFrom');
    const isCityGeoIpError = sessionStorage.getItem('isCityGeoIpError');
    const dateFrom = sessionStorage.getItem('dateFrom');

    if (dateFrom) dispatch(setDateFrom(DateTime.fromISO(dateFrom).toISODate()));

    if (cityApiFrom && cityFrontFrom)
      dispatch(
        setRouteFrom({ apiRoute: cityApiFrom, frontRoute: cityFrontFrom })
      );

    if (!cityApiFrom && !cityFrontFrom && !isCityGeoIpError)
      dispatch(detectCityByGeoIp());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleCal = (e, a) => {
    if (e && node.current && node?.current.contains(e.target)) {
      return;
    }

    if (
      !mainSearchParams.date.api.to &&
      !mainSearchParams.date.changedInput.to &&
      dropDownCal.isOpenCalendar
    )
      dispatch(setOneWay(true));

    dispatch(setIsOpenCalendar());
  };

  useEffect(() => {
    if (debouncedSearchInput) {
      if (
        !historyCitiesData[inputDirection].find(
          (item) =>
            item.keyWord === inputValue[inputDirection].toLowerCase() ||
            !inputValue[inputDirection]
        )
      ) {
        getCitiesData(inputValue[inputDirection].toLowerCase(), inputDirection);
      } else {
        inputValue[inputDirection]
          ? setCurrentCitiesData({
              [inputDirection]: historyCitiesData[inputDirection].find(
                (item) =>
                  item.keyWord === inputValue[inputDirection].toLowerCase()
              )
            })
          : setCurrentCitiesData([]);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchInput]);

  useEffect(() => {
    const amount = mainSearchParams.passengers;
    setPassengersAmount(
      amount.passengers_adults +
        amount.passengers_children +
        amount.passengers_infants
    );
  }, [mainSearchParams.passengers]);

  useEffect(() => {
    dispatch(
      setPassengersInfo(
        `${passengersAmount} ${pluralize(passengersAmount, [
          'пассажир',
          'пассажира',
          'пассажиров'
        ])}, ${mainSearchParams.airClasses.economy ? 'эконом' : 'бизнес'}`
      )
    );
    dispatch(
      setPassengersInfoMini(
        `${passengersAmount} ${pluralize(passengersAmount, [
          'пассажир',
          'пассажира',
          'пассажиров'
        ])} / ${mainSearchParams.airClasses.economy ? 'эконом' : 'бизнес'}`
      )
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [passengersAmount, mainSearchParams.airClasses]);

  useEffect(() => {
    const handleOverlayClose = (evt) => {
      if (
        !(
          evt.target.classList.contains('form__input--passenger') ||
          (evt.target.closest('ul')
            ? evt.target.closest('ul').classList.contains('passengers-list')
            : '')
        )
      ) {
        setIsPassengersOpen(false);
      }
    };

    document.addEventListener('click', handleOverlayClose);

    return () => {
      document.removeEventListener('click', handleOverlayClose);
    };
  });

  const openPassengers = () => setIsPassengersOpen(!isPassengersOpen);

  const getCitiesData = async (word, direction) => {
    try {
      const cities = await api.getCities(word, accessData.loginToken);

      setHistoryCitiesData({
        ...historyCitiesData,
        [direction]: [
          ...historyCitiesData[direction],
          {
            keyWord: word,
            citiesInfo: cities.data
          }
        ]
      });
      setCurrentCitiesData({
        [direction]: {
          keyWord: word,
          citiesInfo: cities.data
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  const getValue = (evt) => {
    setInputDirection(evt.target.dataset.direction);
    setInputValue({
      ...inputValue,
      [evt.target.dataset.direction]: evt.target.value
    });

    if (evt.target.dataset.direction === 'from') {
      dispatch(setRouteFrom({ apiRoute: '', frontRoute: evt.target.value }));
    } else {
      dispatch(setRouteTo({ apiRoute: '', frontRoute: evt.target.value }));
    }
  };

  const changeRoutes = () => {
    dispatch(
      setRouteFrom({
        apiRoute: mainSearchParams.route.api.to,
        frontRoute: mainSearchParams.route.front.to
      })
    );
    dispatch(
      setRouteTo({
        apiRoute: mainSearchParams.route.api.from,
        frontRoute: mainSearchParams.route.front.from
      })
    );
  };

  const search = async (evt) => {
    evt.preventDefault();

    if (
      !mainSearchParams.route.front.from ||
      !mainSearchParams.route.front.to ||
      !mainSearchParams.date.front.from
    ) {
      setFormError(true);
      setTimeout(() => setFormError(false), 3000);
      return;
    }

    dispatch(setSearchData(''));

    const people = mainSearchParams.passengers;
    const passengers = `passengers_adults=${people.passengers_adults}${
      people.passengers_children
        ? `&passengers_children=${people.passengers_children}`
        : ''
    }${
      people.passengers_infants
        ? `&passengers_infants=${people.passengers_infants}`
        : ''
    }`;
    const travelClass = `travel_class=${
      mainSearchParams.airClasses.economy ? 'economy' : ''
    }${mainSearchParams.airClasses.business ? 'business' : ''}`;

    const params = {
      origin: mainSearchParams.route.api.from,
      destination: mainSearchParams.route.api.to,
      depart_date: mainSearchParams.date.api.from,
      return_date: mainSearchParams.date.api.to,
      transport: mainSearchParams.transport,
      one_way: mainSearchParams.one_way,
      passengers,
      travelClass
    };

    history.push({
      pathname: '/search-result',
      search: `?origin=${params.origin}&destination=${params.destination}&depart_date=${params.depart_date}${(params.return_date) ? '&return_date=' + params.return_date : ''}&transport=${params.transport}&one_way=${params.one_way}&${params.passengers}&${travelClass}`
    });
  };

  const pickOneWay = (evt) => {
    evt.preventDefault();
    dispatch(setOneWay(true));
    dispatch(setDateTo());
    dispatch(setChangedInputTo(''));
    dispatch(setCalendarToInitial());
  };

  const pickTwoWays = (evt) => {
    evt.preventDefault();
    const fromDate = DateTime.fromISO(mainSearchParams.date.api.from);

    dispatch(setOneWay(false));

    setIsOffsetCal(true);

    if (mainSearchParams.date.api.from) {
      dispatch(setIsOneClick(false));
      dispatch(setIsDateInterval(true));
      dispatch(setIsOpenCalendar(true));

      dispatch(
        setChangedInputFrom(
          `${fromDate.day} ${
            monthNamesDate[fromDate.month]
          }, ${firstToUpperCase(fromDate.weekdayShort)}`
        )
      );
      dispatch(setDateIntervalFrom(fromDate.toISO().slice(0, 10)));
    }
  };

  const inputFromHandler = () => {
    setIsOffsetCal(false);
    dispatch(setIsOneClick(true));
    dispatch(setIsDateInterval(false));
    toggleCal();
  };

  const inputToHandler = () => {
    dispatch(setOneWay(false));
    setIsOffsetCal(true);
    toggleCal();

    const fromDate = DateTime.fromISO(mainSearchParams.date.api.from);

    if (mainSearchParams.date.api.from && !mainSearchParams.date.api.to) {
      dispatch(setIsOneClick(false));
      dispatch(setIsDateInterval(true));
      dispatch(setIsOpenCalendar(true));

      dispatch(
        setChangedInputFrom(
          `${fromDate.day} ${
            monthNamesDate[fromDate.month]
          }, ${firstToUpperCase(fromDate.weekdayShort)}`
        )
      );
      dispatch(setDateIntervalFrom(fromDate.toISO().slice(0, 10)));
    }
  };

  const dropDownOnBlur = () => {
    const city = currentCitiesData.from
      ? currentCitiesData.from?.citiesInfo[0]
      : currentCitiesData.to?.citiesInfo[0];

    if (currentCitiesData?.from)
      dispatch(setRouteFrom({ apiRoute: city?.code, frontRoute: city?.name }));
    if (currentCitiesData?.to)
      dispatch(setRouteTo({ apiRoute: city?.code, frontRoute: city?.name }));

    setInputValue('');
    setCurrentCitiesData('');
  };

  useClickAway(nodeDropDown, dropDownOnBlur);
  useClickAway(nodeDropDown2, dropDownOnBlur);

  const handleOnBlurTab = (e) => {
    if (e.key !== 'Tab') return;

    dropDownOnBlur();
  };

  const handleKeyDown = (e, isDirectionFrom) => {
    if (e.key !== 'Tab') return;

    e.preventDefault();
    setIsOffsetCal(isDirectionFrom);
    dispatch(setIsOpenCalendar(true));
  };

  return (
    <form className="form">
      <div className="form__nav">
        <div
          onClick={pickTwoWays}
          className={`form__nav-btn ${
            !mainSearchParams.one_way ? 'form__nav-btn--active' : ''
          }`}
        >
          Туда - обратно
        </div>
        <div
          onClick={pickOneWay}
          className={`form__nav-btn ${
            mainSearchParams.one_way ? 'form__nav-btn--active' : ''
          }`}
        >
          В одну сторону
        </div>
        <button
          onClick={(evt) => evt.preventDefault()}
          className="form__nav-btn"
        >
          Сложный маршрут
        </button>
      </div>
      <div className={`form__inner ${formError ? 'form__inner--error' : ''}`}>
        <div className="form__group form__group--departure">
          <input
            onChange={getValue}
            value={mainSearchParams.route.front.from || ''}
            className="form__input"
            type="text"
            id="main-departure"
            placeholder="Откуда"
            autoComplete="off"
            data-direction="from"
            tabIndex="1"
            onKeyDown={handleOnBlurTab}
          />
          <label className="form__label" htmlFor="main-departure">
            откуда
          </label>
          <button onClick={changeRoutes} type="button" className="form__switch">
            Поменять местами
          </button>
          {currentCitiesData.from?.citiesInfo && (
            <DropDown
              nodeDropDown={nodeDropDown}
              currentCities={currentCitiesData.from?.citiesInfo}
              setCurrentCitiesData={setCurrentCitiesData}
              setInputValue={setInputValue}
              inputEl={inputEl}
              inputDirection={inputDirection}
              dateFromInput={dateFromInput}
            />
          )}
        </div>
        <div className="form__group form__group--arrival">
          <input
            onChange={getValue}
            value={mainSearchParams.route.front.to || ''}
            className="form__input form__input--arrival"
            type="text"
            id="main-arrival"
            placeholder="Куда"
            autoComplete="off"
            ref={inputEl}
            data-direction="to"
            tabIndex="2"
            onKeyDown={handleOnBlurTab}
            onFocus={() => dispatch(setIsOpenCalendar(false))}
          />
          <label
            className="form__label form__label--arrival"
            htmlFor="main-arrival"
          >
            куда
          </label>
          {currentCitiesData.to?.citiesInfo && (
            <DropDown
              nodeDropDown={nodeDropDown2}
              currentCities={currentCitiesData.to?.citiesInfo}
              setCurrentCitiesData={setCurrentCitiesData}
              setInputValue={setInputValue}
              inputEl={inputEl}
              inputDirection={inputDirection}
              dateFromInput={dateFromInput}
            />
          )}
        </div>
        <div className="form__group form__group--date-dep">
          <input
            onClick={inputFromHandler}
            className="form__input"
            id="date-departure"
            placeholder="Туда"
            value={
              mainSearchParams.date.front.from
                ? mainSearchParams.date.front.from
                : mainSearchParams.date.changedInput.from
            }
            readOnly
            tabIndex="3"
            ref={dateFromInput}
            onKeyUp={(e) => handleKeyDown(e, false)}
          />
          <label className="form__label" htmlFor="date-departure">
            туда
          </label>
          {dropDownCal.isOpenCalendar && (
            <DropDownCalendar
              isOffsetCal={isOffsetCal}
              closeToggle={toggleCal}
              dateToInput={dateToInput}
              node={node}
            />
          )}
        </div>
        <div className="form__group form__group--date-arr">
          <input
            onClick={inputToHandler}
            className="form__input"
            id="date-arrival"
            placeholder="Дата обратно"
            ref={dateToInput}
            value={
              mainSearchParams.date.front.to
                ? mainSearchParams.date.front.to
                : mainSearchParams.date.changedInput.to
            }
            readOnly
            tabIndex="4"
            onKeyUp={(e) => handleKeyDown(e, true)}
          />
          <label className="form__label" htmlFor="date-arrival">
            обратно
          </label>
        </div>
        <div className="form__group form__group--passengers">
          <input
            onClick={openPassengers}
            className="form__input form__input--passenger"
            id="main-passenger"
            placeholder="Пассажиры и класс"
            value={mainSearchParams.passengersInfo}
            readOnly
            tabIndex="5"
            onFocus={() => dispatch(setIsOpenCalendar(false))}
          />
          <label className="form__label" htmlFor="main-passenger">
            Пассажиры и класс
          </label>
          <DropDownPassengers isPassengersOpen={isPassengersOpen} />
        </div>
        <input
          onClick={search}
          className="form__btn"
          type="submit"
          value="Найти"
        />
      </div>
      {!searchResult && <OpenBooking />}
    </form>
  );
}

export default SearchForm;
