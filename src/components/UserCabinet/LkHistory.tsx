import LkContentClearAll from "./LkContent/LkContentClearAll"
import UserCabinetContentRoute from "./LkContent/UserCabinetContentRoute"

function LkHistory() {
  return (
    <>
      <div className="cabinet__col-wrap">
        <h2 className="cabinet__title cabinet__title--history">История</h2>
        <LkContentClearAll />
      </div>
      <ul className="cabinet__col-list">
        <UserCabinetContentRoute />
        <UserCabinetContentRoute />
        <UserCabinetContentRoute />
      </ul>
    </>
  )
}

export default LkHistory
