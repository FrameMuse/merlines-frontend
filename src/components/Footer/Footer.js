import "./footer.scss"

import useLocalization from "../../plugins/localization/hook"
import FooterInfo from "./FooterInfo"

function Footer() {
  const ll = useLocalization(ll => ll)
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__inner">
          <FooterInfo />
        </div>
        <div className="footer__copyright">
          <p className="footer__copyright-text">
            © 2018-{currentYear}, {ll.main.copyright}
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
