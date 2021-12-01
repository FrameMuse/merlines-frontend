function LoaderClose(props) {
  return (
    <section className="download-close">
      {props.children}
      <div className="download__inner">
        <h2 className="download__title">Подбираем билеты для Вас</h2>
      </div>
      <div className="download__plane download__plane--closed-form"></div>
    </section>
  )
};

export default LoaderClose;
