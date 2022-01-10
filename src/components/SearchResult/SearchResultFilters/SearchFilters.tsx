// SCSS
import "./filters.scss"

import SearchFilter from "./SearchFilter"
import SearchFilterCheckbox from "./UX/SearchFilterCheckbox"
import SearchFilterCheckboxes from "./UX/SearchFilterCheckboxes"
import SearchFilterTimeRange from "./UX/SearchFilterTimeRange"

function SearchFilters() {
  return (
    <div className="filters__container">
      <div className="filters__header">
        <h2 className="filters__title">Фильтры</h2>
        <button className="filters__clear" type="button">очистить все</button>
      </div>

      <div className="search-filters">
        <SearchFilter label="Пересадки">
          <SearchFilterCheckboxes name="transfers">
            <SearchFilterCheckbox name="0">Без пересадки</SearchFilterCheckbox>
            <SearchFilterCheckbox name="1">1 пересадка</SearchFilterCheckbox>
            <SearchFilterCheckbox name="2">2 пересадка</SearchFilterCheckbox>
            <SearchFilterCheckbox name="3">3 пересадка</SearchFilterCheckbox>
            <SearchFilterCheckbox name="4">4 пересадка</SearchFilterCheckbox>
          </SearchFilterCheckboxes>
        </SearchFilter>
        <SearchFilter label="Время отправления и прибытия">
          <h3>Туда</h3>
          <>
            <h5>Отправление из Москвы</h5>
            <SearchFilterTimeRange name="departure-time-range" min={(10 * 60)} max={(10 * 60 * 60) + (45 * 60)} />
          </>
          <>
            <h5>Прибытие в Париж</h5>
            <SearchFilterTimeRange name="arrival-time-range" min={(10 * 60)} max={(10 * 60 * 60) + (45 * 60)} />
          </>
        </SearchFilter>
        <SearchFilter label="Время в пути">
          <h3>Туда</h3>
          <SearchFilterTimeRange name="travel-time-range" min={(3 * 60 * 60) + (10 * 60)} max={(25 * 60 * 60) + (45 * 60)} />
        </SearchFilter>
        <SearchFilter label="Время пересадки">
          <h3>Туда</h3>
          <SearchFilterTimeRange name="transfers-time-range" min={(3 * 60 * 60) + (10 * 60)} max={(25 * 60 * 60) + (45 * 60)} />
        </SearchFilter>
        <SearchFilter label="Багаж">
          <SearchFilterCheckboxes name="luggage">
            <SearchFilterCheckbox name="baggage">Только багаж <span className="weak">(от 70 000  ₽)</span></SearchFilterCheckbox>
            <SearchFilterCheckbox name="baggage-luggage">Багаж и ручная кладь <span className="weak">(от 130 000  ₽)</span></SearchFilterCheckbox>
          </SearchFilterCheckboxes>
        </SearchFilter>
        <SearchFilter label="Авиакомпании" extraLabel="4">
          <SearchFilterCheckboxes name="luggage">
            <SearchFilterCheckbox name="Аэрофлот">Аэрофлот</SearchFilterCheckbox>
            <SearchFilterCheckbox name="Белавиа">Белавиа</SearchFilterCheckbox>
            <SearchFilterCheckbox name="Анонисефлот">Анонисефлот</SearchFilterCheckbox>
            <SearchFilterCheckbox name="Аниавиа">Аниавиа</SearchFilterCheckbox>
          </SearchFilterCheckboxes>
        </SearchFilter>
        <SearchFilter label="Аэропорты">
          <h3>Туда</h3>
          <>
            <h5>Отправление из Москвы</h5>
            <SearchFilterCheckboxes name="airports">
              <SearchFilterCheckbox name="Шереметьево">Шереметьево</SearchFilterCheckbox>
              <SearchFilterCheckbox name="Домодедово">Домодедово</SearchFilterCheckbox>
            </SearchFilterCheckboxes>
          </>
          <>
            <h5>Прибытие в Париж</h5>
            <SearchFilterCheckboxes name="airports">
              <SearchFilterCheckbox name="Моль-де-Хлоп">Моль-де-Хлоп</SearchFilterCheckbox>
              <SearchFilterCheckbox name="Шарль-де-Голь">Шарль-де-Голь</SearchFilterCheckbox>
            </SearchFilterCheckboxes>
          </>
        </SearchFilter>
        <SearchFilter label="Аэропорты пересадок">
          <h3>Туда</h3>
          <>
            <h4>Первая пересадка</h4>
            <h5>Венгрия</h5>
            <SearchFilterCheckboxes name="airports">
              <SearchFilterCheckbox name="Шереметьево">Шереметьево</SearchFilterCheckbox>
              <SearchFilterCheckbox name="Домодедово">Домодедово</SearchFilterCheckbox>
            </SearchFilterCheckboxes>
          </>
          <>
            <h4>Вторая пересадка</h4>
            <>
              <h5>Турция</h5>
              <SearchFilterCheckboxes name="airports">
                <SearchFilterCheckbox name="Шереметьево">Шереметьево</SearchFilterCheckbox>
                <SearchFilterCheckbox name="Домодедово">Домодедово</SearchFilterCheckbox>
              </SearchFilterCheckboxes>
            </>
            <>
              <h5>Португалия</h5>
              <SearchFilterCheckboxes name="airports">
                <SearchFilterCheckbox name="Шереметьево">Шереметьево</SearchFilterCheckbox>
                <SearchFilterCheckbox name="Домодедово">Домодедово</SearchFilterCheckbox>
              </SearchFilterCheckboxes>
            </>
          </>
        </SearchFilter>
        <SearchFilter label="Агентства" extraLabel="2">
          <SearchFilterCheckboxes name="luggage">
            <SearchFilterCheckbox name="Aviakassa">Aviakassa <span className="weak">(от 10 000  ₽)</span></SearchFilterCheckbox>
            <SearchFilterCheckbox name="Tickets.by">Tickets.by <span className="weak">(от 13 000  ₽)</span></SearchFilterCheckbox>
          </SearchFilterCheckboxes>
        </SearchFilter>
      </div>
    </div>
  )
}

export default SearchFilters
