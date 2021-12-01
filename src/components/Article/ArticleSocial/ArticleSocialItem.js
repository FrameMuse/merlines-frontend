import { Link } from 'react-router-dom';

import Svg from '../../common/Svg';

function ArticleSocialItem({ socialItem }) {
  return (
    <li className="article__social-item">
      <Link className={`article__social-link article__social-link--${socialItem.name}`} to={socialItem.link}>
        <Svg svgClass="article__social-icon" svgName={socialItem.svg} svgWidth="30" svgHeight="30" />
      </Link>
    </li>
  )
};

export default ArticleSocialItem;
