import Svg from '../common/Svg';

function LandingPopularDirectionItem({ from, to, price }) {
  return (
    <div className="airlines-ticket airlines-ticket--secondary">
      <span className="airlines-ticket-head">
        {from}
        <Svg svgClass="airlines-ticket__arrow" svgName="arrow" svgWidth="10" svgHeight="7" />
        {to}
      </span>
      <span className="airlines-ticket__price">{`от ${price.toLocaleString()} ₽`}</span>
      <button className="airlines-ticket__button">Выбрать даты</button>
    </div>
  )
};

export default LandingPopularDirectionItem;
