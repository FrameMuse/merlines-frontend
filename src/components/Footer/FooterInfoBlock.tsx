import _ from "lodash"
import { Link } from "react-router-dom"
import { classWithModifiers } from "utils"

import { footerInfoData } from "../../constants"
import Icon from "../common/Icon"

interface FooterInfoBlockProps {
  title: string
  links: any
  modifier: string
}

function FooterInfoBlock(props: FooterInfoBlockProps) {
  return (
    <div className={classWithModifiers("footer__col", props.modifier)}>
      <h2 className="footer__title">{props.title}</h2>
      <div className="footer__list">
        {props.links.map((link: any, index: number) => (
          <div className="footer__item" key={index}>
            <Link className={classWithModifiers("footer__link", link.modifier)} to={link.link}>
              {link.svg ? (
                <>
                  <Icon
                    className="footer__link-icon"
                    name={link.svg}
                    width="15"
                    height="15"
                  />
                  {_.capitalize(link.svg)}
                </>
              ) : (
                link.name
              )}
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FooterInfoBlock
