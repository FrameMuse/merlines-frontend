const routes = {
  main: "/",
  air: "/air",
  bus: "/bus",
  train: "/train",
  priceCalendar: {
    base: "/price-calendar",
    air: "/price-calendar/air",
    train: "/price-calendar/train",
    bus: "/price-calendar/bus",
    airDays: "/price-calendar/air/days",
    trainDays: "/price-calendar/train/days",
    busDays: "/price-calendar/bus/days"
  },
  searchResult: "/search-result",
  lk: {
    base: "/lk",
    history: "/lk/history",
    subscribes: "/lk/subscribes",
    question: "/lk/question",
    edit: "/lk/edit"
  },
  article: "/article",
  blog: "/blog",
  signup: "/signup",
  login: "/login",
  activate: "/activate",
  footer: {
    aboutUs: "/about",
    aboutProject: "/project",
    rules: "/rules",
    cookies: "/cookies",
    privacyPolicy: "/privacy",
    advertising: "/ad",
    priceList: "/price",
    forPartners: "/partners",
    help: "/help",
    faq: "/faq",
    askQuestion: "/question",
    socialNetwork: "/social",
    instagram: "/instagram",
    facebook: "/facebook"
  },
  resetPassword: "/reset",
  resetPasswordConfirm: "/reset_password",
  landing: {
    air: "/tickets/air",
    airDays: "/tickets/air/days"
  }
}

export default routes
