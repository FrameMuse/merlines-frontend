import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import routes from '../../../routes';
import Svg from '../../common/Svg';
import { selectLkData } from '../../../reducers/lkDataSlice';
import Logout from '../../common/Logout';

function LkHeader() {
  const history = useHistory();
  const lkData = useSelector(selectLkData);
  const onClickEditProfile = () => history.push(routes.lk.edit);

  return (
    <div className="cabinet__header">
      <div className="cabinet__user">
        <img className="cabinet__user-avatar" src="images/avatar/1.jpg" alt="Евгений Пороховой" />
        <div className="cabinet__user-inner">
          <div className="cabinet__user-text">Здравствуйте,</div>
          <div className="cabinet__user-name">
            {lkData.firstName} {lkData.lastName && lkData.lastName} <Svg handleClick={onClickEditProfile} svgClass="cabinet__edit-icon" svgName="edit" svgWidth="15" svgHeight="15" />
            {lkData.email}
          </div>
        </div>
      </div>
      <Logout />
    </div>
  )
};

export default LkHeader;
