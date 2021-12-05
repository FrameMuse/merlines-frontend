import PropTypes from "prop-types"
import React, { Component } from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { Link } from "react-router-dom"

import { validationMessages } from "../../constants"
import routes from "../../routes"
import Svg from "../common/Svg"
import { login } from "./LoginActions.js"

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: "",
      emailValidity: true,
      passwordValidity: true,
      emailValidationMessage: validationMessages.email,
      passwordValidationMessage: validationMessages.password,
      isPasswordHide: true
    }
  }

  onClickToggleVisibilityOfPassword = () =>
    this.setState({ isPasswordHide: !this.state.isPasswordHide })

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
    this.setState({ [`${e.target.name}Validity`]: e.target.validity.valid })
  }

  onSubmitLoginForm = (e) => {
    e.preventDefault()
    const userData = {
      email: this.state.email,
      password: this.state.password
    }
    console.log(`Login ${userData.email}`)
    // this.props.login(userData, routes.main);
    this.props.login(userData, routes.lk.base, this.props.isRememberMe)
  }
  render() {
    return (
      <>
        <h2 className="modal__title">Войти через E-Mail</h2>
        <form className="modal__form" onSubmit={this.onSubmitLoginForm}>
          <div className="input-group modal__form-group">
            <input
              className="input-group__input"
              // isInvalid={this.props.signupUser.emailError}
              type="email"
              name="email"
              id="login_email"
              placeholder="Enter email"
              value={this.state.email}
              onChange={this.onChange}
              autoComplete="off"
            />
            {!this.state.emailValidity ? (
              <label
                className="input-group__label input-group__label--error"
                htmlFor="login_email"
              >
                {this.state.emailValidationMessage}
              </label>
            ) : (
              <label className="input-group__label" htmlFor="login_email">
                Email
              </label>
            )}
          </div>
          <div className="input-group modal__form-group modal__form-group--last">
            <input
              className="input-group__input"
              // isInvalid={this.props.signupUser.passwordError}
              type={this.state.isPasswordHide ? "password" : "text"}
              name="password"
              id="login_password"
              placeholder="Пароль"
              value={this.state.password}
              onChange={this.onChange}
              minLength={8}
              autoComplete="off"
            />
            {!this.state.passwordValidity ? (
              <label
                className="input-group__label input-group__label--error"
                htmlFor="login_password"
              >
                {this.state.passwordValidationMessage}
              </label>
            ) : (
              <label className="input-group__label" htmlFor="login_password">
                Пароль
              </label>
            )}
            <button
              className={`show-password ${
                this.state.isPasswordHide ? "show-password--active" : ""
              }`}
              onClick={this.onClickToggleVisibilityOfPassword}
              type="button"
              aria-label="Показать пароль"
            >
              <svg className="show-password__icon" width="24" height="24">
                <use
                  className="show-password__icon-on"
                  href="img/sprite.svg#visibility"
                ></use>
                <use
                  className="show-password__icon-off"
                  href="img/sprite.svg#visibility-off"
                ></use>
              </svg>
            </button>
          </div>
          <div className="modal__bottom">
            <div className="checkbox checkbox--modal">
              <input
                checked={this.props.isRememberMe}
                readOnly
                className="checkbox-input"
                type="checkbox"
                id="check"
              />
              <label className="checkbox-label" htmlFor="check">
                <Svg
                  handleClick={() => this.props.setIsRememberMe()}
                  svgClass="checkbox-icon"
                  svgName="checkbox"
                  svgWidth="13"
                  svgHeight="13"
                />
                Запомнить меня
              </label>
            </div>
            <Link className="modal__link-recovery" to={routes.resetPassword}>
              Забыли пароль?
            </Link>
          </div>
          <input className="modal__submit" type="submit" value="Войти" />
        </form>
        <div className="modal__middle">или</div>
        <h2 className="modal__title modal__title--social">Вход через...</h2>
        <ul className="modal__social">
          <li className="modal__item">
            <Link
              onClick={() => this.props.getFullRoute()}
              className="modal__link"
              to={routes.footer.instagram}
            >
              <Svg
                svgClass="modal__link-icon"
                svgName="instagram"
                svgWidth="15"
                svgHeight="15"
              />
              Instagram
            </Link>
          </li>
          <li className="modal__item">
            <Link
              onClick={() => this.props.getFullRoute()}
              className="modal__link"
              to={routes.footer.facebook}
            >
              <Svg
                svgClass="modal__link-icon"
                svgName="facebook"
                svgWidth="15"
                svgHeight="15"
              />
              Facebook
            </Link>
          </li>
        </ul>
      </>
    )
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps, {
  login
})(withRouter(Login))
