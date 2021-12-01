import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { signupNewUser } from './SignupActions';
import routes from '../../routes';
import { validationMessages } from '../../constants';

import Svg from '../common/Svg';
class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      isSamePassword: true,
      firstNameValidity: true,
      lastNameValidity: true,
      emailValidity: true,
      passwordValidity: true,
      firstNameValidationMessage: validationMessages.name,
      lastNameValidationMessage: validationMessages.surname,
      emailValidationMessage: validationMessages.email,
      passwordValidationMessage: validationMessages.password,
      isSamePasswordMessage: validationMessages.confirmPassword,
      isPasswordHide: true
    };
  }

  onClickToggleVisibilityOfPassword = () => this.setState({ isPasswordHide: !this.state.isPasswordHide });

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    this.setState({ [`${e.target.name}Validity`]: e.target.validity.valid });
  };

  checkPasswords = e => this.setState({ isSamePassword: this.state.password === e.target.value });

  onSubmitRegisterForm = (e) => {
    e.preventDefault();
    const userData = {
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      username: this.state.email,
      email: this.state.email,
      password: this.state.password
    };
    this.state.isSamePassword && this.props.signupNewUser(userData);
    // this.props.setPopupName('Вход');
  };

  render() {
    return (
      <>
        <h2 className='modal__title'>Регистрация через E-Mail</h2>
        <form className='modal__form' onSubmit={this.onSubmitRegisterForm}>
          <div className='input-group modal__form-group'>
            <input
              className='input-group__input'
              isinvalid={this.props.createUser.usernameError}
              type='text'
              name='firstName'
              id='firstName'
              placeholder='Имя пользователя'
              value={this.state.firstName}
              onChange={this.onChange}
              minLength={2}
              autoComplete="off"
            />
            {
              !this.state.firstNameValidity
                ?
                <label className='input-group__label input-group__label--error' htmlFor='firstName'>
                  {this.state.firstNameValidationMessage}
                </label>
                :
                <label className='input-group__label' htmlFor='firstName'>Имя</label>
            }
            {/* {this.props.createUser.usernameError} */}
          </div>

          <div className='input-group modal__form-group'>
            <input
              className='input-group__input'
              isinvalid={this.props.createUser.usernameError}
              type='text'
              name='lastName'
              id='lastName'
              placeholder='Фамилия'
              value={this.state.lastName}
              onChange={this.onChange}
              minLength={2}
              autoComplete="off"
            />
            {
              !this.state.lastNameValidity
                ?
                <label className='input-group__label input-group__label--error' htmlFor='lastName'>
                  {this.state.lastNameValidationMessage}
                </label>
                :
                <label className='input-group__label' htmlFor='lastName'>Фамилия (необязательно)</label>
            }
          </div>

          <div className='input-group modal__form-group'>
            <input
              className='input-group__input'
              isinvalid={this.props.createUser.emailError}
              type='email'
              name='email'
              id='email'
              placeholder='Enter email'
              value={this.state.email}
              onChange={this.onChange}
              autoComplete="off"
            />
            {
              !this.state.emailValidity
                ?
                <label className='input-group__label input-group__label--error' htmlFor='email'>
                  {this.state.emailValidationMessage}
                </label>
                :
                <label className='input-group__label' htmlFor='email'>Email</label>
            }
          </div>

          <div className='input-group modal__form-group'>
            <input
              className='input-group__input'
              isinvalid={this.props.createUser.passwordError}
              type={this.state.isPasswordHide ? 'password' : 'text'}
              name='password'
              id='password'
              placeholder='Пароль'
              value={this.password}
              onChange={this.onChange}
              minLength={8}
              autoComplete="off"
            />
            {
              !this.state.passwordValidity
                ?
                <label className='input-group__label input-group__label--error' htmlFor='password'>
                  {this.state.passwordValidationMessage}
                </label>
                :
                <label className='input-group__label' htmlFor='password'>Пароль</label>
            }
            <button className={`show-password ${(this.state.isPasswordHide) ? 'show-password--active' : ''}`}
              onClick={this.onClickToggleVisibilityOfPassword}
              type="button"
              aria-label="Показать пароль">
              <svg className="show-password__icon" width="24" height="24">
                <use className="show-password__icon-on" href="img/sprite.svg#visibility"></use>
                <use className="show-password__icon-off" href="img/sprite.svg#visibility-off"></use>
              </svg>
            </button>
          </div>
          <div className='input-group modal__form-group modal__form-group--last'>
            <input
              className='input-group__input'
              isinvalid={this.props.createUser.passwordError}
              type={this.state.isPasswordHide ? 'password' : 'text'}
              name='confirmPassword'
              id='confirmPassword'
              placeholder='Повторите пароль'
              value={this.confirmPassword}
              onChange={this.checkPasswords}
              minLength={8}
              autoComplete="off"
              required
            />
            {
              !this.state.isSamePassword
                ?
                <label className='input-group__label input-group__label--error' htmlFor='confirmPassword'>
                  {this.state.isSamePasswordMessage}
                </label>
                :
                <label className='input-group__label' htmlFor='confirmPassword'>Повторите пароль</label>
            }
          </div>
          <div className="modal__bottom">
            {/* <div className="checkbox checkbox--modal">
              <input
                checked={this.props.isRememberMe}
                readOnly
                className="checkbox-input"
                type="checkbox"
                id="check" />
              <label className="checkbox-label" htmlFor="check">
                <Svg
                  handleClick={() => this.props.setIsRememberMe()}
                  svgClass="checkbox-icon"
                  svgName="checkbox"
                  svgWidth="13"
                  svgHeight="13" />
                Запомнить меня
              </label>
            </div> */}
          </div>
          <input className='btn btn--modal' type='submit' value='Зарегистрироваться' />
        </form>
        <div className="modal__middle">или</div>
        <h2 className="modal__title modal__title--social">Регистрация через...</h2>
        <ul className="modal__social">
          <li className="modal__item">
            <Link onClick={() => this.props.getFullRoute()} className="modal__link" to={routes.footer.instagram}>
              <Svg svgClass="modal__link-icon" svgName="instagram" svgWidth="15" svgHeight="15" />
          Instagram
        </Link>
          </li>
          <li className="modal__item">
            <Link onClick={() => this.props.getFullRoute()} className="modal__link" to={routes.footer.facebook}>
              <Svg svgClass="modal__link-icon" svgName="facebook" svgWidth="15" svgHeight="15" />
          Facebook
        </Link>
          </li>
        </ul>
      </>
    );
  }
}

Signup.propTypes = {
  signupNewUser: PropTypes.func.isRequired,
  createUser: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  createUser: state.createUser
});

export default connect(mapStateToProps, {
  signupNewUser
})(withRouter(Signup));
