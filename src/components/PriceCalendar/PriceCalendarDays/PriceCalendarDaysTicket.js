import Svg from '../../common/Svg';
import {separateThousand} from "../../../utils";

function PriceCalendarDaysTicket() {
  return (
    <div className="days__row-ticket">
      <div className="ticket ticket ticket--calendar">
        <div className="ticket__container">
          <div className="ticket__inner">
            <div className="ticket__inner-item ticket__inner-item--left">
              <time className="ticket__date">20 Янв, Пн</time>
              <div className="ticket__time">02:15</div>
            </div>
            <div className="ticket__middle">
              <span className="ticket__flight-time">25ч 55м в пути</span>
              <div className="ticket__union">
                <div className="ticket__union-item ticket__union-item--left"></div>
                <div className="ticket__union-item ticket__union-item--right"></div>
              </div>
            </div>
            <div className="ticket__inner-item ticket__inner-item--right">
              <time className="ticket__date">21 Янв, Вт</time>
              <div className="ticket__time">17:20</div>
            </div>
          </div>
          <div className="ticket__point">
            <div className="ticket__point-item ticket__point-item--left">
              <span className="ticket__point-city">
                Москва
                <span className="ticket__point-comma">,</span>
              </span>
              <span className="ticket__point-city">Домодедово</span>
            </div>
            <div className="ticket__point-item ticket__point-item--right">
              <span className="ticket__point-city">
                Париж
                <span className="ticket__point-comma">,</span>
              </span>
              <span className="ticket__point-city">Орли</span>
            </div>
          </div>
        </div>
        <div className="ticket__footer">
          <div className="ticket__price">`${separateThousand('130000')}  ₽`</div>
          <button className="btn btn--info ticket__btn-info">
            Найти <Svg svgClass="btn__arrow-icon" svgName="arrow-open" svgWidth="8" svgHeight="8" />
          </button>
        </div>
      </div>
    </div>
  )
};

export default PriceCalendarDaysTicket;
