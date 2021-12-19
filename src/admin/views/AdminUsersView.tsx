import AdminEditUsers from "admin/components/AdminEditUsers/AdminEditUsers"
import AdminViewLayout from "admin/layouts/AdminViewLayout"

function AdminUsersView() {
  return (
    <AdminViewLayout title="Пользователи">
      <AdminEditUsers />
    </AdminViewLayout>
  )
}

export default AdminUsersView
