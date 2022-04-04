import React, {useEffect, useState} from "react"
import {useQuery} from "react-fetching-library"
import {useSelector} from "react-redux"

import {deleteAllTrackingTickets, getTrackingTickets, ITrackingTicket} from "../../../api/actions/tracking"
import ClientAPI from "../../../api/client"
import {classWithModifiers} from "../../../utils"
import Modal from "../../Modal/Modal"
import SearchResultAirTicket
  from "../../SearchResult/SearchResultContainers/SearchResultAirContainer/SearchResultAirTicket"

interface props {

}

const UserCabinetSubscribedTickets: React.FC<props> = () => {
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
        <h2 className="cabinet__title">Билеты</h2>
        {results.length ? (
          <div className={classWithModifiers("button-text", "cabinet", "right")}>
            <button className="button-text__btn" type="button" onClick={handleChangeModalState}>
              очистить всю историю
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
              Загрузить ещё {pageSize} билетов
            </button>
          )}
        </div> :
        <div className="cabinet__empty cabinet__empty--subscription">
          <h3 className="cabinet__empty-text">В данном разделе пока пусто</h3>
        </div>
      }

      <Modal visible={deleteModal} onCancel={handleChangeModalState}>
        <div className={"cabinet__history-delete-wrap"}>
          <p className={"cabinet__history-delete-text"}>
            Вы уверенны, что хотите очистить список подписанных билетов?
          </p>
          <div className={"cabinet__history-delete-buttons"}>
            <button className={"cabinet__history-delete-submit"} onClick={onDeleteTickets}>
              Удалить
            </button>
            <button className={"cabinet__history-delete-cancel"} onClick={handleChangeModalState}>
              Не удалять
            </button>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default UserCabinetSubscribedTickets

