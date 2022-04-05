import {deleteHistory, deleteHistoryChunk, getHistory} from "api/actions/history"
import ClientAPI, {Action} from "api/client"
import {Fragment, useEffect, useState} from "react"
import {useQuery} from "react-fetching-library"
import {classWithModifiers, pluralize} from "utils"

import useLocalization from "../../../plugins/localization/hook"
import {humanizeDate} from "../../SearchForm/SearchForm.utils"
import UserCabinetModal from "./UserCabinetModal"

function UserCabinetHistory() {
  const ll = useLocalization(ll => ll)
  const [deleteModal, setDeleteModal] = useState<boolean>(false)
  const [page, setPage] = useState(1)
  const [pageSize] = useState(15)

  const [results, setResults] = useState<(ReturnType<typeof getHistory> extends Action<infer A> ? A : never)["results"]>([])

  const {error, loading, payload, query} = useQuery(getHistory(page, pageSize))
  useEffect(() => {
    if (!payload) return
    setResults(payload.results)
  }, [payload])
  if (error) throw new Error("useQuery error")
  if (loading) return <>loading...</>
  if (!payload) return <>no content</>

  function handleChangeModalState() {
    setDeleteModal(!deleteModal)
  }

  function onDeleteHistory() {
    ClientAPI.query(deleteHistory)
    setResults([])
    handleChangeModalState()
  }

  function onDeleteHistoryChunk(id: number) {
    ClientAPI.query(deleteHistoryChunk(id))
    setResults(results => results.filter(chunk => chunk.id !== id))
  }

  return (
    <>
      <div className="cabinet__col-wrap">
        <h2 className="cabinet__title cabinet__title--history">{ll.main.history}</h2>
        {results.length > 0 && (
          <div className={classWithModifiers("button-text", "cabinet", "right")}>
            <button className="button-text__btn" type="button" onClick={handleChangeModalState}>
              {ll.lk.clearHistory}
            </button>
          </div>
        )}
      </div>
      <div className="cabinet__col-list">
        {results.map(({adults, children, infants, id, travel_class, trips}) => {
          const passengersCount = adults + children + infants
          return (
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
                  {passengersCount} {pluralize(passengersCount, ll.main.passengers.plural)} / {ll.main.travelClasses[travel_class]}
                </span>
                <button
                  className="download__edit download__edit--clear"
                  type="button"
                  onClick={() => onDeleteHistoryChunk(id)}
                />
              </div>
            </div>
          )
        })}
      </div>
      {payload.results.length === 0 && (
        <div className="cabinet__empty cabinet__empty--subscription">
          <h3 className="cabinet__empty-text">{ll.main.emptyText}</h3>
        </div>
      )}
      <UserCabinetModal visible={deleteModal} handleCancel={handleChangeModalState} handleOk={onDeleteHistory}/>
    </>
  )
}

export default UserCabinetHistory
