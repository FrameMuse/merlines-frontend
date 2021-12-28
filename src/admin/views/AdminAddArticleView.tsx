import AdminArticleEdit from "admin/components/AdminArticleEdit/AdminArticleEdit"
import AdminViewLayout from "admin/layouts/AdminViewLayout"
import { ToastContainer } from "react-toastify"

function AdminAddArticleView() {
  return (
    <AdminViewLayout title="Добавить статью">
      <AdminArticleEdit new />
      <ToastContainer />
    </AdminViewLayout>
  )
}

export default AdminAddArticleView
