import controllerParams from './controllersParams';
import api from '../api/api';

// path = location.pathname
// searchParams = location.search
// params = result of getParams()
// queryHook = useQuery
// dispatchHook = useDispatch
// dispatchReducerFrom = setRouteFrom()
// dispatchReducerTo = setRouteTo()

const getParams = (path) => {
  return controllerParams.find(item => item.name === path);
};

const parseSearchParams = (params, queryHook) => {
  let newParams = {
    name: params.name,
    routeParams: {}
  };

  params.mainParams.forEach(param => {
    newParams.routeParams[param] = queryHook.get(param);
  });

  if (params.optionalParams.length > 0) {
    params.optionalParams.forEach(optionalParam => {
      newParams.routeParams[optionalParam] = queryHook.get(optionalParam);
    });
  };

  return newParams;
};

const getCityNameFrom = async (queryHook, dispatchHook, dispatchReducerFrom) => {
  const codeFrom = queryHook.get('origin');

  if (codeFrom) {
    try {
      const cityFrom = await api.getCityNameFromCode(codeFrom);
      if (cityFrom) {
        dispatchHook(dispatchReducerFrom({ apiRoute: codeFrom, frontRoute: cityFrom.data[0].cases.su }));
        sessionStorage.setItem('cityFrontFrom', cityFrom.data[0].cases.su);
        sessionStorage.setItem('cityApiFrom', codeFrom);
      }
    } catch (error) {
      console.log(error);
    }
  }
};

const getCityNameTo = async (queryHook, dispatchHook, dispatchReducerTo) => {
  const codeTo = queryHook.get('destination');

  if (codeTo) {
    try {
      const cityTo = await api.getCityNameFromCode(codeTo);
      if (cityTo) {
        dispatchHook(dispatchReducerTo({ apiRoute: codeTo, frontRoute: cityTo.data[0].cases.su }));
        sessionStorage.setItem('cityFrontTo', cityTo.data[0].cases.su);
        sessionStorage.setItem('cityApiTo', codeTo);
      }
    } catch (error) {
      console.log(error);
    }
  }
};

const parseParamsFromRoute = (path, searchParams, queryHook, dispatchHook, dispatchReducerFrom, dispatchReducerTo) => {
  const paramsForCurrentRoute = getParams(path);
  const testParamsParse = searchParams && parseSearchParams(paramsForCurrentRoute, queryHook);

  if (searchParams.length > 0) {
    const isCityNamesInSession = (sessionStorage.getItem('cityFrontFrom') && sessionStorage.getItem('cityFrontTo'))
      && (sessionStorage.getItem('cityApiFrom') && sessionStorage.getItem('cityApiTo'));
    const isCurrentRouteSameAsInSession = (sessionStorage.getItem('cityApiFrom') === queryHook.get('origin'))
      && (sessionStorage.getItem('cityApiTo') === queryHook.get('destination'));

    if (isCityNamesInSession) {
      if (isCurrentRouteSameAsInSession) {
        sessionStorage.setItem('currentController', testParamsParse.name);
        sessionStorage.setItem('mainParams', JSON.stringify(testParamsParse.routeParams));
        dispatchHook(dispatchReducerFrom({ apiRoute: testParamsParse.routeParams.origin, frontRoute: sessionStorage.getItem('cityFrontFrom') }));
        dispatchHook(dispatchReducerTo({ apiRoute: testParamsParse.routeParams.destination, frontRoute: sessionStorage.getItem('cityFrontTo') }));
      } else {
        console.log('else??????');
        sessionStorage.setItem('currentController', testParamsParse.name);
        sessionStorage.setItem('mainParams', JSON.stringify(testParamsParse.routeParams));
        getCityNameFrom(queryHook, dispatchHook, dispatchReducerFrom);
        getCityNameTo(queryHook, dispatchHook, dispatchReducerTo);
      };
    } else {
      console.log('second else???');
      sessionStorage.setItem('currentController', testParamsParse.name);
      sessionStorage.setItem('mainParams', JSON.stringify(testParamsParse.routeParams));
      getCityNameFrom(queryHook, dispatchHook, dispatchReducerFrom);
      getCityNameTo(queryHook, dispatchHook, dispatchReducerTo);
    };
  }

  return testParamsParse;
};

export default parseParamsFromRoute;
