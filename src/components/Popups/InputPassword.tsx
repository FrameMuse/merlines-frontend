import Icon from "components/common/Icon"
import { ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, useState } from "react"
import { classWithModifiers } from "utils"

import { validationMessages } from "../../constants"


interface InputPasswordProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> { }

function InputPassword(props: InputPasswordProps) {
  const [isShown, setIsShown] = useState(props.type === "text")
  const [isValid, setIsValid] = useState(false)
  function onChange(event: ChangeEvent<HTMLInputElement>) {
    // TODO: Validation
    props.onChange?.(event)
  }
  return (
    <label className="input-group">
      <input {...props} type={isShown ? "text" : "password"} className="input-group__input" onChange={onChange} />
      <div className={classWithModifiers("input-group__label", !isValid && "error")}>
        {isValid ? "новый пароль" : validationMessages.password}
      </div>

      <button
        className={classWithModifiers("show-password", isShown && "active")}
        onClick={() => setIsShown(!isShown)}
        type="button"
        aria-label="Показать пароль"
      >
        <Icon className="show-password__icon" name="visibility" />
        {/* <svg width="24" height="24">
          <use
            className="show-password__icon-on"
            href="img/sprite.svg#visibility"
          ></use>
          <use
            className="show-password__icon-off"
            href="img/sprite.svg#visibility-off"
          ></use>
        </svg> */}
      </button>
    </label>
  )
}

export default InputPassword
