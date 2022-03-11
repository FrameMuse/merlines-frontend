function UserCabinetContentRoute() {
  // TODO: #106 Добавить "Удалить все результаты"
  return (
    <div className="cabinet__col-item">
      <div className="download__field download__field--cabinet download__field--one">
        <span className="download__item download__item--city download__item--icon">Москва</span>
        <span className="download__item download__item--city">Париж</span>
        <span className="download__item download__item--date">15 октября</span>
        <span className="download__item download__item--passenger">1 пассажир / эконом</span>
        <button className="download__edit download__edit--clear" type="button" />
      </div>
    </div>
  )
}

export default UserCabinetContentRoute
