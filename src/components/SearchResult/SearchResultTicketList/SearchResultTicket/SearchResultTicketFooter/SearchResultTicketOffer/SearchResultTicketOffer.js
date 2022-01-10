import { separateThousand } from "utils"

import SearchResultTicketBuy from "./SearchResultTicketBuy"

function SearchResultTicketOffer({
  price,
  description,
  ticketDealerName,
  ticketDealerLogo,
  link
}) {

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
