import { priceDynamicData } from '../landingMock';
import LandingPriceDynamicItem from './LandingPriceDynamicItem';

function LandingPriceDynamic() {
  return (
    <div className="price-dynamics__schedule">
      <ul className="price-dynamics__schedule-list">
        {priceDynamicData.map((item, index) =>
          <LandingPriceDynamicItem
            key={index}
            itemClass={item.itemClass}
            price={item.itemPrice}
            name={item.itemName} />
        )}
      </ul>
    </div>
  )
};

export default LandingPriceDynamic;
