import { useState } from "react"
import Svg from "../common/Svg"

function LandingAnswerItem({ currentRoute }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="answers__item">
      <div
        className={`answers__item-wrap ${
          isOpen ? "answers__item-wrap--active" : ""
        }`}
      >
        <div className="answers__question">
          <p className="answers__question-text">{`Есть ли ограничения на перелёты по маршруту ${currentRoute}?`}</p>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`answers__button ${
            isOpen ? "answers__button--active" : ""
          }`}
        >
          Ответ{" "}
          <Svg
            svgClass="answers__button-arrow"
            svgName="arrow-open"
            svgWidth="8"
            svgHeight="8"
          />
        </button>
      </div>
      <div className="answers__item-inner">
        <p className="answers__item-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
          lobortis commodo erat, sed commodo nisl porttitor sit amet. Donec
          mollis vestibulum purus ut malesuada. Vivamus varius mi ut ante
          scelerisque, nec congue neque posuere. Etiam nec quam sapien. Mauris
          lectus neque, volutpat accumsan feugiat sed, sodales id massa.
          Praesent sodales, ante vitae hendrerit tincidunt, urna lectus congue
          neque, ut tristique diam ipsum id sem. Fusce condimentum lorem et urna
          finibus venenatis. Fusce sed mi at elit hendrerit laoreet eget sit
          amet risus.
        </p>
      </div>
    </div>
  )
}

export default LandingAnswerItem
