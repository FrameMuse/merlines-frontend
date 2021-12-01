import MainSpecialCard from "./MainSpecialCard"

function MainSpecialList() {
  const mockDataCards = [
    {
      from: "Москва",
      to: "Германия",
      city: "Берлин",
      price: 6000
    },
    {
      from: "Москва",
      to: "Германия",
      city: "Берлин",
      price: 7000
    },
    {
      from: "Москва",
      to: "Германия",
      city: "Берлин",
      price: 8000
    },
    {
      from: "Москва",
      to: "Германия",
      city: "Берлин",
      price: 9000
    },
    {
      from: "Москва",
      to: "Германия",
      city: "Берлин",
      price: 10000
    },
    {
      from: "Москва",
      to: "Германия",
      city: "Берлин",
      price: 11000
    },
    {
      from: "Москва",
      to: "Германия",
      city: "Берлин",
      price: 12000
    },
    {
      from: "Москва",
      to: "Германия",
      city: "Берлин",
      price: 13000
    }
  ]

  return (
    <ul className="special__list">
      <MainSpecialCard
        bestCard={true}
        bestCardImg="img/special/2.jpg"
        cardFrom="Москва"
        cardTo="Германия"
        cardToCity="Берлин"
        cardPrice="5000"
      />
      {mockDataCards.map((card, index) => (
        <MainSpecialCard
          key={index}
          cardFrom={card.from}
          cardTo={card.to}
          cardToCity={card.city}
          cardPrice={card.price}
        />
      ))}
    </ul>
  )
}

export default MainSpecialList
