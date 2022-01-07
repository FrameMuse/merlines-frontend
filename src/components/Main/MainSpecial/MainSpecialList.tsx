import MainSpecialCard from "./MainSpecialCard"


const mockDataCards = [
  {
    from: "Москва",
    to: "Германия",
    city: "Берлин",
    price: 5000
  },
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


function MainSpecialList() {
  return (
    <div className="special__list">
      <MainSpecialCard isBest image="img/special/2.jpg" {...mockDataCards[0]} />
      {mockDataCards.slice(1).map((card, index) => (
        <MainSpecialCard {...card} key={index} />
      ))}
    </div>
  )
}

export default MainSpecialList
