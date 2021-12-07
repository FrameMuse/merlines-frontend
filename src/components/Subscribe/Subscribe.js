import "./subscribe.scss"

import React from "react"
import { Link } from "react-router-dom"

import SubscribeForm from "./SubscribeForm"

function Subscribe() {
  return (
    <section className="subscribe">
      <div className="subscribe__container">
        <h2 className="subscribe__title">Получайте уведомления</h2>
        <p className="subscribe__text">
          И первым узнавайте о скидках и выгодных предложениях!
        </p>
        <SubscribeForm />
        <p className="subscribe__rule">
          Нажимая «Подписаться», Вы соглашаетесь с
          <Link className="subscribe__rule-link" to="#">
            правилами использования сервиса и обработки персональных данных
          </Link>
        </p>
      </div>
    </section>
  )
}

export default Subscribe
