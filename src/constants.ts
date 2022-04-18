import { Localize } from "./plugins/localization/controller"
import routes from "./routes"
const ll = Localize(ll => ll)

export const weekDays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"]

export const BASE_URL = "http://api.merlines.ru/api/v1"

export const monthNames = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь"
]

export const declinedMonthNames = [
  "Января",
  "Февраля",
  "Марта",
  "Апреля",
  "Мая",
  "Июня",
  "Июля",
  "Август",
  "Сентября",
  "Октября",
  "Ноября",
  "Декабря"
]

export const monthNamesDate = {
  1: "Января",
  2: "Февраля",
  3: "Марта",
  4: "Апреля",
  5: "Мая",
  6: "Июня",
  7: "Июля",
  8: "Августа",
  9: "Сентября",
  10: "Октября",
  11: "Ноября",
  12: "Декабря"
}
export const monthsShortNamesByNumbers = {
  1: "Янв",
  2: "Фев",
  3: "Мар",
  4: "Апр",
  5: "Мая",
  6: "Июн",
  7: "Июл",
  8: "Авг",
  9: "Сен",
  10: "Окт",
  11: "Ноя",
  12: "Дек"
}
export const weekDaysByNumbers = {
  1: "Пн",
  2: "Вт",
  3: "Ср",
  4: "Чт",
  5: "Пт",
  6: "Сб",
  7: "Вс"
}
export const Transport = {
  air: {
    name: "Самолёты",
    path: "air"
  },
  train: {
    name: "Поезда",
    path: "train"
  },
  bus: {
    name: "Автобусы",
    path: "bus"
  }
}

export const ApiParams = {
  priceCalendar: {
    month: "month",
    day: "day"
  }
}

export const errorMessages = {
  error404: "Запрашиваемый ресурс не найден",
  error500: "Сервер не отвечает"
}

export const footerInfoData = [
  {
    name: ll.main.aboutUs,
    link: routes.footer.aboutUs,
    links: [
      {
        name: "О проекте",
        link: routes.footer.aboutProject
      }
    ]
  },
  {
    name: ll.main.rules,
    link: routes.footer.rules,
    links: [
      {
        name: ll.main.cookies,
        link: routes.footer.cookies
      },
      {
        name: ll.main.privacyPolicy,
        link: routes.footer.privacyPolicy
      }
    ]
  },
  {
    name: ll.main.advertising,
    link: routes.footer.advertising,
    links: [
      {
        name: ll.main.priceList,
        link: routes.footer.priceList
      },
      {
        name: ll.main.forPartners,
        link: routes.footer.forPartners
      }
    ]
  },
  {
    name: ll.main.help,
    link: routes.footer.help,
    links: [
      {
        name: ll.main.faq,
        link: routes.footer.faq
      },
      {
        name: ll.main.askQuestion,
        link: routes.footer.askQuestion
      }
    ]
  },
  {
    name: ll.main.socialNetworks,
    link: routes.footer.socialNetwork,
    modifier: "social",
    // links: [
    //   {
    //     name: "Instagram",
    //     link: routes.footer.instagram,
    //     modifier: "footer__link--instagram",
    //     svg: "instagram"
    //   },
    //   {
    //     name: "Facebook",
    //     link: routes.footer.facebook,
    //     modifier: "footer__link--facebook",
    //     svg: "facebook"
    //   }
    // ]
  }
]

export const lkNavConfig = [
  { itemName: ll.main.favourites, svgName: "star", route: routes.lk.base },
  { itemName: ll.main.history, svgName: "history", route: routes.lk.history },
  { itemName: ll.main.subscribes, svgName: "notice", route: routes.lk.subscribes },
  { itemName: ll.main.askQuestion, svgName: "question", route: routes.lk.question }
]
