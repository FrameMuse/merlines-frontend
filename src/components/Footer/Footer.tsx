import "./Footer.scss"

import { footerInfoData } from "../../constants"
import FooterInfoBlock from "./FooterInfoBlock"

function Footer() {
  const fullYear = new Date().getFullYear()
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__inner">
          {footerInfoData.map((info, index) => (
            <FooterInfoBlock {...info as any} key={index} />
          ))}
        </div>
        <div className="footer__copyright">
          <p className="footer__copyright-text">
            © 2018-{fullYear}, ООО «Транспортно-туристическая компания
            МерЛайнс»
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
