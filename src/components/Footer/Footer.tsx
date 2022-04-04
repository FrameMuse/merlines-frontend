import "./Footer.scss"

import { footerInfoData } from "../../constants"
import useLocalization from "../../plugins/localization/hook"
import FooterInfoBlock from "./FooterInfoBlock"

function Footer() {
  const ll = useLocalization(ll => ll)
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
            © 2018-{fullYear}, {ll.main.copyright}
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
