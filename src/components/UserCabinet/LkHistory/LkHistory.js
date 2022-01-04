import LkContentClearAll from "../LkContent/LkContentClearAll"
import LkContentRoute from "../LkContent/LkContentRoute"

function LkHistory() {
  return (
    <>
      <div className="cabinet__col-wrap">
        <h2 className="cabinet__title cabinet__title--history">История</h2>
        <LkContentClearAll />
      </div>
      <ul className="cabinet__col-list">
        <LkContentRoute />
        <LkContentRoute />
        <LkContentRoute />
      </ul>
    </>
  )
}

export default LkHistory
