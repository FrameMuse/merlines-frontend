import MainSpecialTitle from './MainSpecialTitle';
import MainSpecialSubtitle from './MainSpecialSubtitle';
import MainSpecialSwitcher from './MainSpecialSwitcher';
import MainSpecialList from './MainSpecialList';

function MainSpecial() {
  return (
    <section className="special">
      <div className="special__container">
        <div className="special__inner">
          <MainSpecialTitle />
          <MainSpecialSubtitle />
          <MainSpecialSwitcher />
        </div>
      </div>
      <div className="special__wrap">
        <MainSpecialList />
      </div>
    </section>
  )
};

export default MainSpecial;
