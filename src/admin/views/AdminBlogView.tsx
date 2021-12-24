import AdminBlogPriorities from "admin/components/AdminBlog/AdminBlogPriorities"
import AdminBlogMailing from "admin/components/AdminBlogMailing/AdminBlogMailing"
import AdminEditTags from "admin/components/AdminEditTags/AdminEditTags"
import AdminViewLayout from "admin/layouts/AdminViewLayout"

function AdminBlogView() {
  return (
    <AdminViewLayout title="Блог">
      <AdminEditTags />
      <AdminBlogMailing />
      <AdminBlogPriorities />
    </AdminViewLayout>
  )
}

export default AdminBlogView
