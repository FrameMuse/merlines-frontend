import React, {useEffect, useState} from "react"
import {useQuery} from "react-fetching-library"
import {useSelector} from "react-redux"

import {deleteAllTrackingTickets, getTrackingTickets, ITrackingTicket} from "../../../api/actions/tracking"
import ClientAPI from "../../../api/client"
import useLocalization from "../../../plugins/localization/hook"
import {classWithModifiers} from "../../../utils"
import SearchResultAirTicket
  from "../../SearchResult/SearchResultContainers/SearchResultAirContainer/SearchResultAirTicket"
import UserCabinetModal from "./UserCabinetModal"

interface props {

}

const UserCabinetSubscribedTickets: React.FC<props> = () => {
  const ll = useLocalization(ll => ll)
  const transport = useSelector(state => state.search.transport)

  const [deleteModal, setDeleteModal] = useState<boolean>(false)
  const [page, setPage] = useState(1)
  const [pageSize] = useState(15)
  const [results, setResults] = useState<ITrackingTicket[]>([])
  const {error, loading, payload, status} = useQuery(getTrackingTickets(transport, page, pageSize))

  useEffect(() => {
    if (status === 200 && payload) {
      if (page > 1) return setResults(results => [...results, ...payload.results])

      setResults(payload.results)
    }
  }, [payload])

  if (error) throw new Error("useQuery error")
  if (loading) return <>loading...</>
  if (!payload) return <>no content</>

  function handleChangeModalState() {
    setDeleteModal(!deleteModal)
  }

  function onDeleteTickets() {
    ClientAPI.query(deleteAllTrackingTickets(transport)).then(() => {
      setResults([])
      handleChangeModalState()
    })
  }

  return (
    <>
      <div className="cabinet__col-wrap cabinet__col-wrap--subscription">
        <h2 className="cabinet__title">{ll.lk.tickets}</h2>
        {results.length ? (
          <div className={classWithModifiers("button-text", "cabinet", "right")}>
            <button className="button-text__btn" type="button" onClick={handleChangeModalState}>
              {ll.lk.clearHistory}
            </button>
          </div>
        ) : null}
      </div>
      {results.length ?
        <div className={classWithModifiers("ticket-list__content", loading && "loading")}>
          {results.map(ticket => (
            <SearchResultAirTicket {...ticket} key={ticket.id}/>
          ))}
          {(page * pageSize) <= payload.count && (
            <button className="ticket-list__more" type="button" onClick={() => setPage(page + 1)}>
              {ll.lk.loadMore} {pageSize} {ll.lk.moreTickets}
            </button>
          )}
        </div> :
        <div className="cabinet__empty cabinet__empty--subscription">
          <h3 className="cabinet__empty-text">{ll.main.emptyText}</h3>
        </div>
      }
      <UserCabinetModal visible={deleteModal} handleOk={onDeleteTickets} handleCancel={handleChangeModalState}/>
    </>
  )
}

export default UserCabinetSubscribedTickets

