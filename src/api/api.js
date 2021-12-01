import axios from "axios"
import { BASE_URL, ApiParams } from "../constants"

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "content-type": "application/json",
    // Authorization: 'Token 5dcb4c15305ce73935bc19aeab611d6f38f5f888'
    Authorization: "Token c5bb30bfc37f48c561e7621a99e1b13a30dd0a6d"
  }
})

const instanceNoToken = axios.create({
  baseURL: BASE_URL,
  headers: {
    "content-type": "application/json"
  }
})

const instanceUser = axios.create({
  baseURL: BASE_URL
  // headers: {
  //   'content-type': 'application/json',
  //   'Authorization': `Token ${userToken}`
  // }
})

const api = {
  getMonths: (transport, params) =>
    instance({
      method: "GET",
      url: `/calendar/${transport}`,
      params: {
        ...params
        // date_group_by: ApiParams.priceCalendar.month
      }
    }),

  getMonthsTest: (transport, route) =>
    instance({
      method: "GET",
      url: `/calendar/${transport}${route}`
    }),

  getDays: (transport, params) =>
    instance({
      method: "GET",
      url: `/calendar/${transport}`,
      params: {
        ...params,
        date_group_by: ApiParams.priceCalendar.day
      }
    }),

  getCurrentCity: () =>
    instance({
      method: "GET",
      url: "/info/ip/"
    }),

  getCitiesNames: (word) =>
    instance({
      method: "GET",
      url: "/geo/city/",
      params: {
        search: word
      }
    }),

  getCities: (word) =>
    instance({
      method: "GET",
      url: "/info/city/",
      params: {
        name__istartswith: word,
        limit: 7
      }
    }),

  getFilter: (params) =>
    instance({
      method: "GET",
      url: "/filter/",
      params: { ...params }
    }),

  getTickets: (params) =>
    instance({
      method: "GET",
      url: "/tps/",
      params: {
        ...params
      }
    }).catch((error) => {
      console.error({ type: "Failure", error })
      throw error
    }),

  getBusTickets: (params) =>
    instance({
      method: "GET",
      url: "/tickets/bus",
      params: {
        ...params
      }
    }),
  // getTickets: (params, userToken) =>
  // instance({
  //   method: 'GET',
  //   url: `/tps/${params}`,
  // }),

  getLink: (params) =>
    instance({
      method: "GET",
      url: `/tps/link/?link=${params.link}&search_id=${params.search_id}`
      // data: { ...params },
    }),

  registration: (params) =>
    instanceNoToken({
      method: "POST",
      url: "/users/",
      data: { ...params }
    }),

  login: (params) =>
    instance({
      method: "POST",
      url: "/token/login/",
      data: { ...params }
    }),

  logout: (userToken) =>
    instanceUser({
      headers: {
        "content-type": "application/json",
        Authorization: `Token ${userToken}`
      },
      method: "POST",
      url: "/token/logout/"
    }),

  activation: (params) =>
    instance({
      method: "POST",
      url: "/users/activation/",
      data: { ...params }
    }),

  resendActivation: (params) =>
    instance({
      method: "POST",
      url: "/users/resend_activation/",
      data: { ...params }
    }),

  resetPassword: (params) =>
    instanceNoToken({
      method: "POST",
      url: `/users/reset_password/`,
      data: { ...params }
    }),

  confirmResetPassword: (params) =>
    instanceNoToken({
      method: "POST",
      url: `/users/reset_password_confirm/`,
      data: { ...params }
    }),

  changePassword: (userToken, params) =>
    instanceUser({
      headers: {
        "content-type": "application/json",
        Authorization: `Token ${userToken}`
      },
      method: "POST",
      url: `/users/set_password/`,
      data: { ...params }
    }),

  getUserInfo: (params) =>
    instance({
      method: "GET",
      url: `/users/me/`,
      data: { ...params }
    }),

  editUserInfo: (userToken, params) =>
    instanceUser({
      headers: {
        "content-type": "application/json",
        Authorization: `Token ${userToken}`
      },
      method: "PATCH",
      url: `/users/me/`,
      data: { ...params }
    }),

  getCityNameFromCode: (cityCode) =>
    instance({
      method: "GET",
      url: "/info/city/",
      params: {
        code__iexact: cityCode,
        limit: 1
      }
    })
}

export default api
