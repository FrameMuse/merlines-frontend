import "./SimpleTable.scss"

import Icon from "components/common/Icon"
import { OrderingType } from "interfaces/Django"
import { Dispatch, ReactNode, useState } from "react"
import { classWithModifiers } from "utils"

interface SimpleTableProps<T extends string> {
  head: Record<T, ReactNode>
  body: ReactNode[][]

  onSort?: Dispatch<OrderingType<T>>
  onSelect?: Dispatch<number> // index of head column

  sort?: OrderingType<T>
}

function SimpleTable<T extends string>(props: SimpleTableProps<T>) {
  const headKeys = Object.keys(props.head) as T[]

  const [sortedBy, setSortedBy] = useState<OrderingType<T>>(props.sort || headKeys[0])
  const [selected, setSelected] = useState(-1)
  function select(index: number) {
    setSelected(index)
    props.onSelect?.(index)
  }
  function sort(key: T) {
    let newKey: OrderingType<T> = key

    if (sortedBy.endsWith(key)) {
      newKey = sortedBy.startsWith("-") ? key : `-${key}`
    }

    select(-1)
    setSortedBy(newKey)
    props.onSort?.(newKey)
  }
  return (
    <table className="simple-table">
      <thead>
        <tr>
          {headKeys.map(key => (
            <th key={key}>
              <div className="simple-table__head-column" onClick={() => sort(key)}>
                {props.head[key]}
                <Icon
                  className={classWithModifiers("simple-table__icon", !sortedBy.endsWith(key) && "inactive", sortedBy.startsWith("-") && "up")}
                  name="chevron"
                />
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {props.body.map((columns, index) => (
          <tr className={classWithModifiers("simple-table__body-row", selected === index && "active")} onClick={() => select(index)} key={index}>
            {columns.map((column, index) => (
              <td key={index}>{column}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default SimpleTable