import { useState } from "react"
import { atom, useSetRecoilState } from "recoil"
import { classWithModifiers } from "utils"

import Svg from "../common/Svg"


export const blogSearchState = atom({
  key: "blogSearch",
  default: ""
})

function BlogSearch() {
  const [isSearchHidden, setIsSearchHidden] = useState(true)
  const setBlogSearchState = useSetRecoilState(blogSearchState)
  return (
    <div className={classWithModifiers("search", isSearchHidden && "hidden")}>
      <input className="search__input" type="text" onChange={event => setBlogSearchState(event.currentTarget.value)} />
      <button className="search__button" onClick={() => setIsSearchHidden(!isSearchHidden)}>
        <Svg
          svgClass="search__icon"
          svgName="search"
          svgWidth="15"
          svgHeight="15"
        />
      </button>
    </div>
  )
}

export default BlogSearch
