// SCSS
import "./AdminStats.style.scss"

import AdminBoxLayout from "admin/layouts/AdminBoxLayout"

function AdminStats() {
  return (
    <div className="admin-stats">
      <h2 className="admin-stats__title">Статистика</h2>
      <div className="admin-stats__container">
        <AdminBoxLayout header="Пользователи">
          СТАТИСТИКА
          СТАТИСТИКА
        </AdminBoxLayout>
        <AdminBoxLayout header="Пользователи">
          СТАТИСТИКА
          СТАТИСТИКА
        </AdminBoxLayout>
        <AdminBoxLayout header="Пользователи">
          СТАТИСТИКА
          СТАТИСТИКА
        </AdminBoxLayout>
        <AdminBoxLayout header="Пользователи">
          СТАТИСТИКА
          СТАТИСТИКА
        </AdminBoxLayout>
      </div>
    </div>
  )
}

export default AdminStats
