import React from "react";
import SearchResultTicketError
  from "../TechnicalPages/SearchResultTicketError";

function Loader(props) {
  const  {loadedState} = props
  return (
    <section className="download">
      <div className="download__container">
        {props.children}
      </div>
      {loadedState === 'Failure' ?
        <SearchResultTicketError />
        :
        <>
          <div className="download__inner">
            <h2 className="download__title">Подбираем билеты для Вас</h2>
          </div>
          <div className="download__plane"></div>
        </>}
    </section>
  )
};

export default Loader;
