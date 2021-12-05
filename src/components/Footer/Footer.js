import "./footer.scss"

import FooterInfo from "./FooterInfo"

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__inner">
          <FooterInfo />
        </div>
        <div className="footer__copyright">
          <p className="footer__copyright-text">
            © 2018-{currentYear}, ООО «Транспортно-туристическая компания
            МерЛайнс»
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
