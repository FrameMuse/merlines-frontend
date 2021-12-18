import AdminAddArticle from "admin/components/AdminAddArticle/AdminAddArticle"
import AdminViewLayout from "admin/layouts/AdminViewLayout"

function AdminAddArticleView() {
  return (
    <AdminViewLayout title="Добавить статью">
      <AdminAddArticle />
    </AdminViewLayout>
  )
}

export default AdminAddArticleView
