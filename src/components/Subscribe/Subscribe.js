import "./subscribe.scss"

import React from "react"
import { Link } from "react-router-dom"

import useLocalization from "../../plugins/localization/hook"
import SubscribeForm from "./SubscribeForm"

function Subscribe() {
  const ll = useLocalization(ll => ll)
  return (
    <section className="subscribe">
      <div className="subscribe__container">
        <h2 className="subscribe__title">{ll.main.getNotified}</h2>
        <p className="subscribe__text">
          {ll.main.getNotifiedSubtitle}
        </p>
        <SubscribeForm />
        <p className="subscribe__rule">
          {ll.main.subscribe.text}
          <Link className="subscribe__rule-link" to="#">
            {ll.main.subscribe.link}
          </Link>
        </p>
      </div>
    </section>
  )
}

export default Subscribe
