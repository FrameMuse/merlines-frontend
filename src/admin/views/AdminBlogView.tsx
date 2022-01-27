import AdminEditTags from "admin/components/AdminEditTags/AdminEditTags"
import AdminViewLayout from "admin/layouts/AdminViewLayout"
import { ToastContainer } from "react-toastify"

function AdminBlogView() {
  return (
    <AdminViewLayout title="Блог">
      <AdminEditTags />
      <ToastContainer />
    </AdminViewLayout>
  )
}

export default AdminBlogView
