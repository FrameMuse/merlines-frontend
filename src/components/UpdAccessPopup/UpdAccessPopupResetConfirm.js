import { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Svg from '../common/Svg';
import api from '../../api/api';
import { toast } from 'react-toastify';
import { takeErrors } from '../../utils';
import { errorMessages } from '../../constants';
import { validationMessages } from '../../constants';

function UpdAccessPopupResetConfirm() {
  const [isOpen, setIsOpen] = useState(true);
  let { uid, token } = useParams();
  console.log(uid, token);
  const history = useHistory();
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordValidity, setNewPasswordValidity] = useState(true);
  const [isPasswordHide, setIsPasswordHide] = useState(true);

  const handleOnChangeInput = evt => {
    setNewPassword(evt.target.value);
    setNewPasswordValidity(evt.target.validity.valid);
  };

  const activate = async evt => {
    evt.preventDefault();

    try {
      const result = await api.confirmResetPassword({ uid, token, new_password: newPassword });
      if (result) {
        toast.success('Пароль успешно изменен.');
        history.push('/login');
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response);
        switch (error.response.status) {
          case 401:
            return toast.error(error.response.data.detail);
          case 404:
            return toast.error(error.response.statusText ? error.response.statusText : errorMessages.error404);
          case 500:
            return toast.error(error.response.statusText ? error.response.statusText : errorMessages.error500);
          default:
            const errorsData = takeErrors(error.response.data);
            errorsData.map(errorText => toast.error(errorText));
            console.log(error.response.data);
            console.log(error);
        };
      }
    }
  };

  return (
    <section className={`modal ${isOpen ? "modal--opened" : ""}`}>
      <button onClick={() => setIsOpen(false)} className="modal__close">
        <span className="modal__close-text">закрыть</span>
        <Svg svgClass="modal__close-icon" svgName="close" svgWidth="15" svgHeight="15" />
      </button>
      <div className="modal__container">
        <h2 className="modal__title modal__title--text">Ввод нового пароля</h2>
        <p className="modal__text">
          Ведите новый пароль.
      </p>
        <form onSubmit={activate} className="modal__form">
          <div className="input-group modal__form-group modal__form-group--margin">
            <input
              className="input-group__input"
              type={isPasswordHide ? 'password' : 'text'}
              id="newPassword"
              placeholder="новый пароль"
              value={newPassword}
              minLength={8}
              autoComplete="off"
              onChange={handleOnChangeInput} />
            {
              !newPasswordValidity
                ?
                <label className='input-group__label input-group__label--error' htmlFor='newPassword'>
                  {validationMessages.password}
                </label>
                :
                <label className="input-group__label" htmlFor="newPassword">новый пароль</label>
            }
            <button className={`show-password ${(isPasswordHide) ? 'show-password--active' : ''}`}
              onClick={() => setIsPasswordHide(!isPasswordHide)}
              type="button"
              aria-label="Показать пароль">
              <svg className="show-password__icon" width="24" height="24">
                <use className="show-password__icon-on" href="img/sprite.svg#visibility"></use>
                <use className="show-password__icon-off" href="img/sprite.svg#visibility-off"></use>
              </svg>
            </button>
          </div>
          <input className="modal__submit" type="submit" value="Подтвердить" />
        </form>
      </div>
    </section>
  )
};

export default UpdAccessPopupResetConfirm;
