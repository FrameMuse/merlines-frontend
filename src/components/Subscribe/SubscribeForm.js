function SubscribeForm() {
  return (
    <form className="subscribe__form">
      <div className="subscribe__form-group">
        <input
          className="subscribe__form-email"
          id="subscribe__form-email"
          type="email"
          placeholder="Введите свой E-mail"
        />
        <label
          className="subscribe__form-label"
          htmlFor="subscribe__form-email"
        >
          Введите свой E-mail
        </label>
      </div>
      <input
        className="subscribe__form-btn"
        type="submit"
        value="Подписаться"
      />
    </form>
  )
}

export default SubscribeForm
