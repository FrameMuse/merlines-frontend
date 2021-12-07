import { useState } from "react"
import { useDispatch } from "react-redux"

import { filtersSlice } from "../../../reducers/filtersSlice"
import Checkbox from "./Checkbox"

function SearchResultCustomFilterTransfer({ checkboxes }) {
  const dispatch = useDispatch()

  const [isTransferOpen, setIsTransferOpen] = useState(true)
  const openTransfer = () => setIsTransferOpen(!isTransferOpen)

  const initialState = checkboxes.reduce(
    (acc, { id, checked }) => ({ ...acc, [id]: checked }),
    {}
  )

  const [selectedValue, selectValue] = useState(initialState)

  const handleChange = ({ target: { id, checked } }) => {
    selectValue((prev) => {
      const el = Object.keys(prev).find((el) => prev[el])
      if (el) {
        prev[el] = false
      }

      return {
        ...prev,
        [id]: checked
      }
    })

    dispatch(filtersSlice.actions[id]())
  }

  return (
    <li
      className={`filters__item ${
        isTransferOpen ? "filters__item--opened" : ""
      }`}
    >
      <button onClick={openTransfer} className="filters__btn" type="button">
        Пересадки
      </button>
      <div className="filters__inner">
        {checkboxes.map(({ number, label, id }) => (
          <Checkbox
            key={id}
            number={number}
            label={label}
            checked={selectedValue[id]}
            onChange={handleChange}
            id={id}
          />
        ))}
      </div>
    </li>
  )
}

export default SearchResultCustomFilterTransfer
