import AdminStats from "admin/components/AdminStats/AdminStats"
import AdminViewLayout from "admin/layouts/AdminViewLayout"

function AdminHomeView() {
  return (
    <AdminViewLayout title="Главная">
      <AdminStats />
    </AdminViewLayout>
  )
}

export default AdminHomeView
