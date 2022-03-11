import { deleteHistory, deleteHistoryChunk, getHistory } from "api/actions/history"
import ClientAPI from "api/client"
import { useState } from "react"
import { useQuery } from "react-fetching-library"
import { classWithModifiers } from "utils"

function UserCabinetHistory() {
  const [page, setPage] = useState(1)
  const [pageSize] = useState(15)

  const { error, loading, payload, query } = useQuery(getHistory(page, pageSize))
  if (error) throw new Error("useQuery error")
  if (loading) return <>loading...</>
  if (!payload) return <>no content</>


  function onDeleteHistory() {
    ClientAPI
      .query(deleteHistory)
      .then(() => query())
  }
  function onDeleteHistoryChunk(id: number) {
    ClientAPI
      .query(deleteHistoryChunk(id))
      .then(() => query())
  }
  return (
    <>
      <div className="cabinet__col-wrap">
        <h2 className="cabinet__title cabinet__title--history">История</h2>
        <div className={classWithModifiers("button-text", "cabinet", "right")}>
          <button className="button-text__btn" type="button" onClick={onDeleteHistory}>очистить всю историю</button>
        </div>
      </div>
      <div className="cabinet__col-list">
        {payload.results.map(chunk => (
          <div className="cabinet__col-item" key={chunk.id}>
            <div className="download__field download__field--cabinet download__field--one">
              <span className="download__item download__item--city download__item--icon">{chunk.origin}</span>
              <span className="download__item download__item--city">{chunk.destination}</span>
              <span className="download__item download__item--date">{chunk.date}</span>
              <span className="download__item download__item--passenger">{chunk.passengers} пассажир / эконом</span>
              <button className="download__edit download__edit--clear" type="button" onClick={() => onDeleteHistoryChunk(chunk.id)} />
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default UserCabinetHistory
