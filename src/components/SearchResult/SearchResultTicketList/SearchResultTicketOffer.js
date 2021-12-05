import React from "react"

import { separateThousand } from "../../../utils"
import SearchResultTicketBuy from "./SearchResultTicketBuy"

function SearchResultTicketOffer({
  price,
  description,
  ticketDealerName,
  url
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
            {separateThousand(price)} ₽
          </div>
          <div className="ticket__content-info">{description}</div>
        </div>
        <span style={{ maxWidth: "140px" }} className="ticket__content-middle">
          Продавец билетов
          {/* <img src={ticketDealerLogo} alt={ticketDealerName} width="91" height="42" /> */}
        </span>
        <div className="ticket__content-right">
          <SearchResultTicketBuy
            link={url}
            ticketDealerName={ticketDealerName}
          />
        </div>
      </div>
    </div>
  )
}

export default SearchResultTicketOffer
