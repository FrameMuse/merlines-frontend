import Svg from '../../common/Svg';

function ArticleCommentsHeader() {
  return (
    <header className="comments__header">
      <h2 className="comments__header-title">
        <span className="comments__header-counter">23</span>комментария
      </h2>
      <div className="comments__like">
        <span className="comments__like-counter">24</span>
        <Svg svgClass="comments__like-icon" svgName="like" svgWidth="20" svgHeight="20" />
      </div>
    </header>
  )
};

export default ArticleCommentsHeader;
