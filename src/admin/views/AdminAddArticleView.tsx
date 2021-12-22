import AdminArticleEdit from "admin/components/AdminArticleEdit/AdminArticleEdit"
import AdminViewLayout from "admin/layouts/AdminViewLayout"

function AdminAddArticleView() {
  return (
    <AdminViewLayout title="Добавить статью">
      <AdminArticleEdit />
    </AdminViewLayout>
  )
}

export default AdminAddArticleView
