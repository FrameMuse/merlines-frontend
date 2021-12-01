// import { useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { setTicketDilerName } from '../../../reducers/searchResultSlice';
import SearchResultTicketBuy from "./SearchResultTicketBuy"
import { separateThousand } from "../../../../../../utils"

function SearchResultTicketOffer({
  price,
  description,
  ticketDealerName,
  ticketDealerLogo,
  link
}) {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(setTicketDilerName(ticketDealerName))
  // }, [ticketDealerName]);

  return (
    <div className="ticket__content-top">
      <div className="ticket__content-row">
        <div className="ticket__content-left">
          <div className="ticket__content-price">
            {separateThousand(price)} &nbsp;₽
          </div>
          <div className="ticket__content-info">{description}</div>
        </div>
        <span className="ticket__content-middle">
          {ticketDealerName}
          {/*<img src={ticketDealerLogo} alt={ticketDealerName} width="91" height="42" />*/}
        </span>
        <div className="ticket__content-right">
          <SearchResultTicketBuy
            link={link}
            ticketDealerName={ticketDealerName}
          />
        </div>
      </div>
    </div>
  )
}

export default SearchResultTicketOffer
