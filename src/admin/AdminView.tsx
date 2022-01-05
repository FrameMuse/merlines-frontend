// SCSS
import "./AdminView.style.scss"

import { useSelector } from "react-redux"
import { NavLink, Redirect, Route, Switch } from "react-router-dom"

import AdminAddArticleView from "./views/AdminAddArticleView"
import AdminBlogView from "./views/AdminBlogView"
import AdminEditArticleView from "./views/AdminEditArticleView"
import AdminHomeView from "./views/AdminHomeView"
import AdminUsersView from "./views/AdminUsersView"

function AdminView() {
  const user = useSelector(state => state.user)
  return (
    <>
      {!user.authed && (
        <Redirect to="/" />
      )}
      <header className="admin-header">
        <div className="topbar">
          <div className="topbar-menu">
            <NavLink className="topbar-menu__link" activeClassName="topbar-menu__link--active" exact to="/">Вернуться</NavLink>
            <NavLink className="topbar-menu__link" activeClassName="topbar-menu__link--active" exact to="/admin/">Главная</NavLink>
            <NavLink className="topbar-menu__link" activeClassName="topbar-menu__link--active" to="/admin/blog">Блог</NavLink>
            <NavLink className="topbar-menu__link" activeClassName="topbar-menu__link--active" to="/admin/users">Пользователи</NavLink>
            <NavLink className="topbar-menu__link" activeClassName="topbar-menu__link--active" to="/admin/add-article">Добавить статью</NavLink>
          </div>
        </div>
      </header>
      <main>
        <Switch>
          <Route path="/admin/" exact><AdminHomeView /></Route>
          <Route path="/admin/blog" exact><AdminBlogView /></Route>
          <Route path="/admin/users" exact><AdminUsersView /></Route>
          <Route path="/admin/add-article" exact><AdminAddArticleView /></Route>
          <Route path="/admin/edit-article/:articleId" exact render={props => <AdminEditArticleView articleId={props.match.params.articleId} />} />
        </Switch>
      </main>
    </>
  )
}

export default AdminView
