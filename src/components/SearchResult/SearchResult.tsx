import "./ticket-list.scss"

import { useState } from "react"

import Icon from "../common/Icon"
import Loader from "../Loader/Loader"
import LoaderClose from "../Loader/LoaderClose"
import SearchForm from "../SearchForm/SearchForm"
import SearchFormMini from "../SearchForm/SearchFormMini"
import SearchResultTicketList from "./SearchResultTicketList/SearchTicketList"

function SearchResult() {
  const [isSearchFormOpen, setIsSearchFormOpen] = useState(true)
  return (
    <>
      {/* <Helmet>
        <title>{meta.generateTitle(cityFrom, cityTo, travelClass)}</title>
        <meta
          name="description"
          content={meta.generateMetaDescription(
            cityFrom,
            cityFromCode,
            cityTo,
            cityToCode,
            travelClass,
            isChildren
          )}
        />
      </Helmet> */}
      <section className="ticket-list">
        <div className="ticket-list-form__container">
          {isSearchFormOpen ? (
            <>
              <SearchForm />
              <div className="form-close">
                <button
                  onClick={() => setIsSearchFormOpen(!isSearchFormOpen)}
                  className="form-close__btn"
                  type="button"
                >
                  <Icon name="arrow-angle" className="form-close__icon" />
                </button>
              </div>
            </>
          ) : (
            <SearchFormMini
              openForm={() => setIsSearchFormOpen(!isSearchFormOpen)}
            />
          )}
        </div>
        <div className="ticket-list__container">
          <SearchResultTicketList />
        </div>
        <button className="ticket-list__open-filter">фильтры</button>
      </section>
      <Loader></Loader>
      <SearchForm />
      <div className="form-close">
        <button
          onClick={() => setIsSearchFormOpen(!isSearchFormOpen)}
          className="form-close__btn"
          type="button"
        >
          <Icon name="arrow-angle" className="form-close__icon" />
        </button>
      </div>
      <SearchFormMini openForm={() => setIsSearchFormOpen(!isSearchFormOpen)} />
      <LoaderClose></LoaderClose>
    </>
  )
}

export default SearchResult
