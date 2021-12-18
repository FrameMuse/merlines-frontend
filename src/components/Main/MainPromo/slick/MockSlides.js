const mockDataPromoCards = () => {
  // console.log('mockDataPromoCards.isActiveCard', isActiveCard);
  return [
    {
      title: "Лучшие цены",
      // isActive: isActiveCard.save,
      text: "Помогаем найти самые гибкие маршруты и выгодные цены для клиентов",
      img: "images/advanteges/save-money-bw.png",
      modifier: "save",
      ksClass: "number-slide1"
    },
    {
      title: "Поиск по всему миру",
      // isActive: isActiveCard.seo,
      text: "Постоянно отслеживаем акции, предложения перевозчиков и агентств",
      img: "images/advanteges/seo-bw.png",
      modifier: "seo",
      ksClass: "number-slide2"
    },
    {
      title: "Проверенные поставщики",
      // isActive: isActiveCard.business,
      text: "Сотрудничаем с перевозчиками и агентствами, зарекомендовавшими себя временем",
      img: "images/advanteges/business-meeting-bw.png",
      modifier: "business",
      ksClass: "number-slide3"
    }
  ]
}

export default mockDataPromoCards
