import { Link } from 'react-router-dom';

function LandingSpecialTicket({ imgSrc, companyName, price }) {
  return (
    <div className="airlines-ticket">
      <Link className="airlines-ticket__logo" to="#">
        <img className="airlines-ticket__logo-img" src={imgSrc} width="100" height="31" alt={companyName} />
      </Link>
      <span className="airlines-ticket__price">{`от ${price.toLocaleString()} ₽`}</span>
      <button className="airlines-ticket__button">Выбрать даты</button>
    </div>
  )
};

export default LandingSpecialTicket;
