import AdminEditUsers from "admin/components/AdminEditUsers/AdminEditUsers"
import AdminViewLayout from "admin/layouts/AdminViewLayout"

function AdminAuthorsView() {
  return (
    <AdminViewLayout title="Авторы">
      <AdminEditUsers type="3" />
    </AdminViewLayout>
  )
}

export default AdminAuthorsView
