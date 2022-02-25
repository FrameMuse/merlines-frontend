import routes from "./routes"

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
    name: "О НАС",
    link: routes.footer.aboutUs,
    links: [
      {
        name: "О проекте",
        link: routes.footer.aboutProject
      }
    ]
  },
  {
    name: "Правила",
    link: routes.footer.rules,
    links: [
      {
        name: "Cookies",
        link: routes.footer.cookies
      },
      {
        name: "Политика конфинден­циальности",
        link: routes.footer.privacyPolicy
      }
    ]
  },
  {
    name: "Реклама",
    link: routes.footer.advertising,
    links: [
      {
        name: "Прайс-лист",
        link: routes.footer.priceList
      },
      {
        name: "Партнёрам",
        link: routes.footer.forPartners
      }
    ]
  },
  {
    name: "Помощь",
    link: routes.footer.help,
    links: [
      {
        name: "FAQ",
        link: routes.footer.faq
      },
      {
        name: "Задать вопрос",
        link: routes.footer.askQuestion
      }
    ]
  },
  {
    name: "Социальные сети",
    link: routes.footer.socialNetwork,
    modifier: "social",
    links: [
      {
        name: "Instagram",
        link: routes.footer.instagram,
        modifier: "footer__link--instagram",
        svg: "instagram"
      },
      {
        name: "Facebook",
        link: routes.footer.facebook,
        modifier: "footer__link--facebook",
        svg: "facebook"
      }
    ]
  }
]

export const lkNavConfig = [
  { itemName: "Избранное", svgName: "star", route: routes.lk.base },
  { itemName: "История", svgName: "history", route: routes.lk.history },
  { itemName: "Подписки", svgName: "notice", route: routes.lk.subscribes },
  { itemName: "Задать вопрос", svgName: "question", route: routes.lk.question }
]
