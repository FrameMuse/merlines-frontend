import AdminEditTags from "admin/components/AdminEditTags/AdminEditTags"
import AdminViewLayout from "admin/layouts/AdminViewLayout"

function AdminBlogView() {
  return (
    <AdminViewLayout title="Блог">
      <AdminEditTags />
    </AdminViewLayout>
  )
}

export default AdminBlogView
