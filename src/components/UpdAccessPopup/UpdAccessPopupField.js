function UpdAccessPopupField(props) {
  const {
    fieldId,
    fieldType,
    fieldName,
    inputName,
    fieldClass,
    inputValue,
    takeUserData
  } = props

  return (
    <div className={`modal__form-group ${fieldClass}`}>
      <input
        className="modal__form-input"
        id={fieldId}
        type={fieldType}
        name={inputName}
        value={inputValue || ""}
        onChange={takeUserData}
      />
      <label className="modal__form-label" htmlFor={fieldId}>
        {fieldName}
      </label>
    </div>
  )
}

export default UpdAccessPopupField
