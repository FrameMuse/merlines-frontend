import "./TicketRedirect.scss"

import { getTicketsAirOfferLink } from "api/actions/tickets"
import { useEffect, useState } from "react"
import { useClient } from "react-fetching-library"

import Icon from "../../common/Icon"

interface TicketRedirectProps {
  action: ReturnType<typeof getTicketsAirOfferLink>
  name: string
  image: string
}

function TicketRedirect(props: TicketRedirectProps) {
  const client = useClient()
  const [link, setLink] = useState<string | null>(null)
  async function redirectToOffer() {
    const { error, payload } = await client.query(props.action)
    if (error) return
    if (payload == null) return

    setLink(payload.link)
    window.open(payload.link)
  }
  useEffect(() => { redirectToOffer() }, [])
  return (
    <section className="transfer overlay">
      <div className="transfer__container">
        <div className="transfer__content">
          <Icon className="transfer__loading" name="loading" />
          <p className="transfer__text">
            Немного терпения, переходим на сайт
            {" "}
            {link && (
              <a target="_blank" className="transfer__link" href={link}>{props.name}</a>
            )}
          </p>
          <div className="transfer__logo">
            <img src={props.image} alt="transfer compony logo" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default TicketRedirect
