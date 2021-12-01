import React from "react"
import Subscribe from "../Subscribe/Subscribe"
import AccordionFAQ from "./AccordionFAQ"
import questionSet from "./FAQSet.json"
import { Link } from "react-router-dom"

const FAQ = () => {
  return (
    <>
      <section className="faq">
        <div className="faq__container">
          <div className="faq__intro">
            <h1 className="h1 faq__intro-title">FAQ</h1>
            <p className="text faq__intro-text">
              На этой странице Вы можете найти ответы на интересующие вопросы, а
              если не нашли, можете задать свой вопрос{" "}
              <Link className="text-link" to="/">
                здесь
              </Link>
            </p>
          </div>

          <section className="answers faq__answers">
            <div className="answers__inner">
              {questionSet.set.map((item) => {
                const { question, answer } = item
                return <AccordionFAQ question={question} answer={answer} />
              })}
            </div>
          </section>

          <section className="faq__outro">
            <h2 className="faq__outro-title">Не нашли ответ?</h2>

            <p className="text">
              Если вы не нашли ответ на интересующий вас вопрос в разделе FAQ,
              то вы можете задать вопрос интересующий вас в личном кабинете, в
              разделе{" "}
              <Link className="text-link" to="#">
                задать вопрос
              </Link>
            </p>
          </section>
        </div>
      </section>
      <Subscribe />
    </>
  )
}

export default FAQ
