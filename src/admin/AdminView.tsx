// SCSS
import "./AdminView.style.scss"

import { BrowserRouter, NavLink, Route, Switch } from "react-router-dom"

import AdminAddArticleView from "./views/AdminAddArticleView"
import AdminBlogView from "./views/AdminBlogView"
import AdminHomeView from "./views/AdminHomeView"
import AdminUsersView from "./views/AdminUsersView"

function AdminView() {
  return (
    <BrowserRouter basename="admin">
      <header className="admin-header">
        <div className="topbar">
          <div className="topbar-menu">
            <NavLink className="topbar-menu__link" activeClassName="topbar-menu__link--active" exact to="/">Главная</NavLink>
            <NavLink className="topbar-menu__link" activeClassName="topbar-menu__link--active" to="/blog">Блог</NavLink>
            <NavLink className="topbar-menu__link" activeClassName="topbar-menu__link--active" to="/users">Пользователи</NavLink>
            <NavLink className="topbar-menu__link" activeClassName="topbar-menu__link--active" to="/add-article">Добавить статью</NavLink>
          </div>
        </div>
      </header>
      <main>
        <Switch>
          <Route path="/" exact><AdminHomeView /></Route>
          <Route path="/blog" exact><AdminBlogView /></Route>
          <Route path="/users" exact><AdminUsersView /></Route>
          <Route path="/add-article" exact><AdminAddArticleView /></Route>
        </Switch>
      </main>
    </BrowserRouter>
  )
}

export default AdminView
