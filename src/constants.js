import routes from "./routes"

const weekDays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"]

const BASE_URL = "http://api.merlines.ru/api/v1"

const monthNames = [
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

const monthNamesDate = {
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
const monthsShortNamesByNumbers = {
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
const weekDaysByNumbers = {
  1: "Пн",
  2: "Вт",
  3: "Ср",
  4: "Чт",
  5: "Пт",
  6: "Сб",
  7: "Вс"
}
const Transport = {
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

const ApiParams = {
  priceCalendar: {
    month: "month",
    day: "day"
  }
}

const passengerTypes = [
  {
    name: "Взрослые",
    age: "от 12 лет",
    apiParam: "passengers_adults"
  },
  {
    name: "Дети",
    age: "от 2 до 12 лет",
    apiParam: "passengers_children"
  },
  {
    name: "Младенцы",
    age: "до 2 лет",
    apiParam: "passengers_infants"
  }
]

const passengerClasses = [
  {
    classId: "economy",
    classType: "Эконом"
  },
  {
    classId: "business",
    classType: "Бизнес"
  }
]

const accessPopupFieldsData = {
  login: {
    title: "Войти",
    data: [
      {
        id: "email",
        type: "email",
        name: "e-mail",
        inputName: "email",
        class: ""
      },
      {
        id: "password",
        type: "password",
        name: "пароль",
        inputName: "password",
        class: "modal__form-group--last"
      }
    ]
  },
  registration: {
    title: "Регистрация",
    data: [
      {
        id: "name",
        type: "text",
        name: "имя",
        inputName: "username",
        class: ""
      },
      // { id: 'surname', type: 'text', name: 'фамилия', inputName: '', class: '' },
      {
        id: "email",
        type: "email",
        name: "e-mail",
        inputName: "email",
        class: ""
      },
      {
        id: "password",
        type: "password",
        name: "пароль",
        inputName: "password",
        class: ""
      }
      // { id: 'password-repeat', type: 'password', name: 'повторите пароль', inputName: '', class: 'modal__form-group--last' },
    ]
  }
}

const validationMessages = {
  name: "Имя должно быть не менее 2 букв",
  surname: "Фамилия должна быть не менее 2 букв",
  email: "Введите корректный e-mail",
  password: "Пароль должен быть не менее 8 символов",
  confirmPassword: "Пароль не совпадает"
}

const errorMessages = {
  error404: "Запрашиваемый ресурс не найден",
  error500: "Сервер не отвечает"
}

const footerInfoData = [
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
        linkClass: "footer__link--instagram",
        svg: "instagram"
      },
      {
        name: "Facebook",
        link: routes.footer.facebook,
        linkClass: "footer__link--facebook",
        svg: "facebook"
      }
    ]
  }
]

const lkNavConfig = [
  { itemName: "Избранное", svgName: "star", route: routes.lk.base },
  { itemName: "История", svgName: "history", route: routes.lk.history },
  { itemName: "Подписки", svgName: "notice", route: routes.lk.subscribes },
  { itemName: "Задать вопрос", svgName: "question", route: routes.lk.question }
]

export {
  Transport,
  BASE_URL,
  ApiParams,
  monthNames,
  monthNamesDate,
  weekDays,
  passengerTypes,
  passengerClasses,
  accessPopupFieldsData,
  validationMessages,
  errorMessages,
  footerInfoData,
  lkNavConfig,
  monthsShortNamesByNumbers,
  weekDaysByNumbers
}
