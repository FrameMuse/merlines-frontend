const humanizeTravelClass = travelClass => {
  switch (travelClass) {
    case 'economy':
      return 'эконом';
    case 'business':
      return 'бизнес';
    default:
      return travelClass;
  };
};

const meta = {
  generateTitle: (cityFrom, cityTo, travelClass) => {
    return `Авиабилеты из ${cityFrom} в ${cityTo}. Цены на прямые рейсы ${humanizeTravelClass(travelClass)} класса`
  },
  generateMetaDescription: (cityFrom, cityFromCode, cityTo, cityToCode, travelClass, isChildren) => {
    return `Дешевые авиабилеты из ${cityFrom} (${cityFromCode}) в ${cityTo} (${cityToCode}) на merlines.ru. Лучшие цены на прямые рейсы ${humanizeTravelClass(travelClass)} класса${isChildren ? " с детьми" : ""}`
  },
};

export default meta;
