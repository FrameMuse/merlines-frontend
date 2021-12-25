import AdminArticleEdit from "admin/components/AdminArticleEdit/AdminArticleEdit"
import AdminViewLayout from "admin/layouts/AdminViewLayout"
import { getBlogArticle } from "api/actions/blog"
import { useQuery } from "react-fetching-library"
import { ToastContainer } from "react-toastify"

function AdminEditArticleView(props: { articleId: string }) {
  return (
    <AdminViewLayout title="Редактировать статью">
      <AdminArticleEditContainer {...props} />
      <ToastContainer />
    </AdminViewLayout>
  )
}

function AdminArticleEditContainer(props: { articleId: string }) {
  const { payload } = useQuery(getBlogArticle(props.articleId))
  if (!payload) return <>no content</>

  return (
    <AdminArticleEdit id={props.articleId} edit={payload} />
  )
}

export default AdminEditArticleView
