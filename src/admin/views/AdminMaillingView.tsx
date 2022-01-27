import AdminBlogMailing from "admin/components/AdminBlogMailing/AdminBlogMailing"
import AdminViewLayout from "admin/layouts/AdminViewLayout"

function AdminMaillingView() {
  return (
    <AdminViewLayout title="Рассылки">
      <AdminBlogMailing />
    </AdminViewLayout>
  )
}

export default AdminMaillingView
