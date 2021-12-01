const mockDataPromoCards = () => {
  // console.log('mockDataPromoCards.isActiveCard', isActiveCard);
  return [
    {
      title: "Лучшие цены",
      // isActive: isActiveCard.save,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.",
      img: "images/advanteges/save-money-bw.png",
      modifier: "save",
      ksClass: "number-slide1"
    },
    {
      title: "Поиск по всему миру",
      // isActive: isActiveCard.seo,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.",
      img: "images/advanteges/seo-bw.png",
      modifier: "seo",
      ksClass: "number-slide2"
    },
    {
      title: "Проверенные поставщики",
      // isActive: isActiveCard.business,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.",
      img: "images/advanteges/business-meeting-bw.png",
      modifier: "business",
      ksClass: "number-slide3"
    }
  ]
}

export default mockDataPromoCards
