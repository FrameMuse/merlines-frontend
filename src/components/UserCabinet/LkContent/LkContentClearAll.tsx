import { classWithModifiers } from "utils"

function LkContentClearAll(props: { subscribe?: boolean }) {
  // TODO: #106 Добавить "Удалить все результаты"
  return (
    <div className={classWithModifiers("button-text", "cabinet", props.subscribe && "right")}>
      <button className="button-text__btn" type="button">очистить всю историю</button>
    </div>
  )
}

export default LkContentClearAll
