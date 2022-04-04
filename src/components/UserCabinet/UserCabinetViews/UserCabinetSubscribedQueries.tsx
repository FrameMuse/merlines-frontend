import React, {Fragment, useEffect, useState} from "react"
import {useQuery} from "react-fetching-library"
import {useSelector} from "react-redux"

import {deleteAllTrackingQueries, deleteTrackingQuery, getTrackingQueries} from "../../../api/actions/tracking"
import ClientAPI, {Action} from "../../../api/client"
import {classWithModifiers} from "../../../utils"
import Modal from "../../Modal/Modal"
import {humanizeDate} from "../../SearchForm/SearchForm.utils"


function UserCabinetSubscribedQueries() {
  const transport = useSelector(state => state.search.transport)
  const [deleteModal, setDeleteModal] = useState<boolean>(false)
  const [page, setPage] = useState(1)
  const [pageSize] = useState(15)

  const [results, setResults] = useState<(ReturnType<typeof getTrackingQueries> extends Action<infer A> ? A : never)["results"]>([])

  const {error, loading, payload, status} = useQuery(getTrackingQueries(transport, page, pageSize))

  useEffect(() => {
    if (status === 200 && payload) {
      setResults(payload.results)
    }
  }, [payload, status])

  if (error) throw new Error("useQuery error")
  if (loading) return <>loading...</>

  function handleChangeModalState() {
    setDeleteModal(!deleteModal)
  }

  function onDeleteAllTrackingQueries() {
    ClientAPI.query(deleteAllTrackingQueries(transport)).then(() => {
      setResults([])
      handleChangeModalState()
    })
  }

  function onDeleteTrackingQuery(id: number) {
    ClientAPI.query(deleteTrackingQuery(transport, id)).then(() => {
      setResults(results => results.filter(chunk => chunk.id !== id))
    })
  }

  return (
    <>
      <div className="cabinet__col-wrap">
        <h2 className="cabinet__title cabinet__title--history">Маршруты</h2>
        {results.length ? (
          <div className={classWithModifiers("button-text", "cabinet", "right")}>
            <button className="button-text__btn" type="button" onClick={handleChangeModalState}>
              очистить всю историю
            </button>
          </div>
        ) : null}
      </div>
      {!results.length ?
        (
          <div className="cabinet__empty cabinet__empty--subscription">
            <h3 className="cabinet__empty-text">В данном разделе пока пусто</h3>
          </div>
        ) :
        <div className="cabinet__col-list">
          {results.map(({adults, children, infants, id, trips}) => (
            <div className="cabinet__col-item" key={id}>
              <div className="download__field download__field--cabinet download__field--one">
                {trips.map((trip, idx) => (
                  <Fragment key={idx}>
                    <span className="download__item download__item--city download__item--icon">
                      {trip.origin.title}
                    </span>
                    <span className="download__item download__item--city">
                      {trip.destination.title}
                    </span>
                    <span className="download__item download__item--date">
                      {humanizeDate(new Date(trip.date))}
                    </span>
                  </Fragment>
                ))}
                <span className="download__item download__item--passenger">
                  {children + infants + adults} пассажир (-ов) / эконом
                </span>
                <button
                  className="download__edit download__edit--clear"
                  type="button"
                  onClick={() => onDeleteTrackingQuery(id)}
                />
              </div>
            </div>
          ))}
        </div>
      }

      <Modal visible={deleteModal} onCancel={handleChangeModalState}>
        <div className={"cabinet__history-delete-wrap"}>
          <p className={"cabinet__history-delete-text"}>
            Вы уверенны, что хотите очистить список подписанных маршрутов?
          </p>
          <div className={"cabinet__history-delete-buttons"}>
            <button className={"cabinet__history-delete-submit"} onClick={onDeleteAllTrackingQueries}>
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

export default UserCabinetSubscribedQueries
