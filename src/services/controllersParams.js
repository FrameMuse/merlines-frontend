import routes from "../routes"

const controllerParams = [
  {
    name: routes.searchResult,
    mainParams: [
      "origin",
      "destination",
      "depart_date",
      "transport",
      "one_way"
    ],
    optionalParams: ["return_date", "passengers_adults", "travel_class"]
  },
  {
    name: routes.priceCalendar.air,
    mainParams: [
      "origin",
      "destination",
      "date_group_by",
      "start_date",
      "end_date"
    ],
    optionalParams: []
  },
  {
    name: routes.landing.air,
    mainParams: [
      "origin",
      "destination",
      "date_group_by",
      "start_date",
      "end_date"
    ],
    optionalParams: []
  },
  {
    name: routes.priceCalendar.airDays,
    mainParams: [
      "origin",
      "destination",
      "date_group_by",
      "start_date",
      "end_date"
    ],
    optionalParams: []
  },
  {
    name: routes.landing.airDays,
    mainParams: [
      "origin",
      "destination",
      "date_group_by",
      "start_date",
      "end_date"
    ],
    optionalParams: []
  }
]

export default controllerParams
