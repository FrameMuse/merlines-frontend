import useQuery from "../../hooks/useQuery";
import controllerParams from '../controllersParams';



export const getParametersFromRout = (params) => {
  let newParams = {
    name: params.name,
    routeParams: {}
  };

  params.mainParams.forEach(param => {
    const paramsValue =  useQuery.get(param);
    newParams.routeParams[param] = paramsValue
  });

  if (isListNotEmpty(params.optionalParams)) {
    params.optionalParams.forEach(optionalParam => {
      newParams.routeParams[optionalParam] = useQuery.get(optionalParam);
    });
  };
  return newParams;
}

export const getParamsFromControllerBy = (routName) => {
  const currentParametersList = controllerParams.find(item => item.name === routName)
  return currentParametersList
};

export const getCurrentRout = () => {
  const currentRout = document.location.pathname
  return currentRout
}

export const getSearchParamsFromCurrentRout = () => {
  const searchParameters = document.location.search
  return searchParameters
}

export const isListNotEmpty = (list) => {
  return list?.length > 0
}

export const getRoutParameterByName = (paramName) => {
  //const proveParam = getParamsFromControllerBy(paramName)
  const searchRout = getSearchParamsFromCurrentRout()
  console.log('searchRout', searchRout)
  const paramsFromCurrentRout = getParametersFromRout(searchRout)
  //return paramsFromCurrentRout.routeParams[paramName]
}
