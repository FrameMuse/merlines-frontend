import { useSelector } from 'react-redux';
import { selectMainSearchParams } from '../../reducers/mainSearchSlice';
import Svg from '../common/Svg';

function SearchFormMini({ openForm }) {
  const mainSearchParams = useSelector(selectMainSearchParams);

  return (
    <div className="download-close__wrap">
      <div className="download-close__container">
        <div className="download__field download__field--one">
          <span className="download__item download__item--city download__item--icon">
            {mainSearchParams.route.front.from || ''}
          </span>
          <span className="download__item download__item--city">
            {mainSearchParams.route.front.to || ''}
          </span>
          <span className="download__counter">+3</span>
          <span className="download__item download__item--date">
            {mainSearchParams.date.mini.from}
          </span>
          <span className="download__item download__item--date">
            {mainSearchParams.date.mini.to}
          </span>
          <span className="download__item download__item--passenger">
            {mainSearchParams.passengersInfoMini}
          </span>
          <button onClick={() => openForm()} className="download__edit" type="button">
            <Svg svgClass="download__edit-icon" svgName="edit" svgWidth="16" svgHeight="16" />
          </button>
        </div>
      </div>
    </div>
  )
};

export default SearchFormMini;
