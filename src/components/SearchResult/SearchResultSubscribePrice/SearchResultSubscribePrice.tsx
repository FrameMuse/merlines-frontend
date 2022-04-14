import Modal from "components/Modal/Modal"
import {Fragment, useContext, useState} from "react"
import {useSelector} from "react-redux"
import {Link} from "react-router-dom"
import {toast} from "react-toastify"

import {postTrackingQuery} from "../../../api/actions/tracking"
import ClientAPI from "../../../api/client"
import arrow from "../../../img/icons/arrow-slider.svg"
import {Client} from "../../../interfaces/user"
import useLocalization from "../../../plugins/localization/hook"
import Icon from "../../common/Icon"
import {searchSessionContext} from "../SearchResult"


interface SearchResultSubscribePriceProps {
  isTracked?: boolean
}

function SearchResultSubscribePrice(props: SearchResultSubscribePriceProps) {
  const ll = useLocalization(ll => ll)
  const [isTracked, setIsTracked] = useState<boolean>(!!props.isTracked)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const user = useSelector(state => state.user) as Client

  const transport = useSelector(state => state.search.transport)
  const {session} = useContext(searchSessionContext)
  const searchState = useSelector(state => state.search)

  const [subscribeModal, setSubscribeModal] = useState<boolean>(false)
  const handleChangeModalState = () => setSubscribeModal(!subscribeModal)

  async function subscribeToQuery() {
    setIsLoading(true)
    await ClientAPI.query(postTrackingQuery(transport, session)).then(() => {
      toast.success(ll.searchResult.routeSubscribed, {
        autoClose: 2500,
        pauseOnHover: false,
        closeOnClick: true,
      })
      setIsTracked(true)
    })
    handleChangeModalState()
    setIsLoading(false)
  }


  return (
    <Fragment>
      <button className="ticket-list__notice" type="button" onClick={handleChangeModalState}>
        <span className="ticket-list__notice-text">
          {isTracked ? ll.searchResult.isRouteTracked : ll.searchResult.isRouteNotTracked}
        </span>
        <Icon name={"notice"} className="ticket-list__icon"/>
      </button>

      <Modal visible={subscribeModal} onCancel={handleChangeModalState} closeBtn={true}>
        <div className={"ticket-list__subscribe-modal"}>
          {searchState.routes.map((route, index) => (
            <div key={index}>
              <span className="ticket-list__subscribe-origin">
                {route.origin?.title}
              </span>
              <img className={"ticket-list__subscribe-arrow"} src={arrow} alt=""/>
              <span className="ticket-list__subscribe-destination">
                {route.destination?.title}
              </span>
            </div>
          ))}
          <div className={"ticket-list__subscribe-label"}>
            <div className="ticket-list__subscribe-input">
              {user.email}
            </div>
            <div className="ticket-list__subscribe-placeholder">e-mail</div>
          </div>
          <button
            type={"submit"}
            className={"ticket-list__subscribe-submit"}
            onClick={subscribeToQuery}
            disabled={isLoading}
          >
            {ll.main.acceptSubscribe}
          </button>
          <span className={"ticket-list__subscribe-prompt"}>
            {ll.main.subscribePrivacyText.beforeLink}
            <Link to={"/privacy"}>
              {ll.main.subscribePrivacyText.link}
            </Link>
          </span>
        </div>
      </Modal>
    </Fragment>
  )
}

export default SearchResultSubscribePrice
