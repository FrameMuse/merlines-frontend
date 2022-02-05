import { AdminEditAuthorsContainer } from "admin/components/AdminEditUsers/AdminEditUsers"
import AdminViewLayout from "admin/layouts/AdminViewLayout"

function AdminAuthorsView() {
  return (
    <AdminViewLayout title="Авторы">
      <AdminEditAuthorsContainer />
    </AdminViewLayout>
  )
}

export default AdminAuthorsView
