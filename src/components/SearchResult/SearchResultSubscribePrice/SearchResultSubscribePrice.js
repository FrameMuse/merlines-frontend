import Svg from '../../common/Svg';

function SearchResultSubscribePrice() {
  return (
    <button className="ticket-list__notice" type="button">
      <span className="ticket-list__notice-text">Отслеживать цену</span>
      <Svg svgClass="ticket-list__notice-icon" svgName="notice" svgWidth="15" svgHeight="15" />
    </button>
  )
};

export default SearchResultSubscribePrice;
