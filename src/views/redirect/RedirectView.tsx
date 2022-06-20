import { getTicketsAirOfferLink } from "api/actions/tickets"
import Modal from "components/Modal/Modal"
import TicketRedirect from "components/Popups/TicketRedirect/TicketRedirect"
import { useHistory } from "react-router-dom"

function isDictionary(object: unknown): object is Record<keyof never, unknown> {
  return object instanceof Object && object.constructor === Object
}

function RedirectView() {
  const history = useHistory()

  const search = new URLSearchParams(history.location.search)
  // if (!isDictionary(search)) return null

  const obj = {} as any
  for (const [key, value] of search.entries()) {
    obj[key] = value
  }

  console.log(obj)

  const action = getTicketsAirOfferLink(obj.session, obj.id)

  return (
    <Modal visible>
      <TicketRedirect {...obj} action={action} />
    </Modal>
  )
}

export default RedirectView