// SCSS
import "./AdminView.style.scss"

import { NavLink, Route, Switch } from "react-router-dom"

import AdminAddArticleView from "./views/AdminAddArticleView"
import AdminBlogView from "./views/AdminBlogView"
import AdminHomeView from "./views/AdminHomeView"
import AdminUsersView from "./views/AdminUsersView"

function AdminView() {
  return (
    <>
      <header className="admin-header">
        <div className="topbar">
          <div className="topbar-menu">
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
        </Switch>
      </main>
    </>
  )
}

export default AdminView
