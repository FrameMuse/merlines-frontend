import Icon from "../common/Icon"

function LandingPopularDirectionItem({ from, to, price }) {
  return (
    <div className="airlines-ticket airlines-ticket--secondary">
      <span className="airlines-ticket-head">
        {from}
        <Icon
          className="airlines-ticket__arrow"
          name="arrow"
          width="10"
          height="7"
        />
        {to}
      </span>
      <span className="airlines-ticket__price">{`от ${price.toLocaleString()} ₽`}</span>
      <button className="airlines-ticket__button">Выбрать даты</button>
    </div>
  )
}

export default LandingPopularDirectionItem
