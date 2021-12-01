import { footerInfoData } from "../../constants"
import FooterInfoBlock from "./FooterInfoBlock"

function FooterInfo() {
  return footerInfoData.map((info, index) => (
    <FooterInfoBlock
      key={index}
      title={info.name}
      titleLink={info.link}
      links={info.links}
      modifier={info.modifier}
    />
  ))
}

export default FooterInfo
