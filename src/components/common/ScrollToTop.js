import { useEffect } from "react"
import { useLocation, withRouter } from "react-router-dom"
// import useFullRoute from '../../hooks/useFullRoute';

function _ScrollToTop(props) {
  const { pathname } = useLocation()
  // const path = useFullRoute();
  // const location = useLocation();
  // console.log('path', path);

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  // window.onbeforeunload = function () {
  //   window.scrollTo(0, 0);
  // };

  return props.children
}

const ScrollToTop = withRouter(_ScrollToTop)

export default ScrollToTop
