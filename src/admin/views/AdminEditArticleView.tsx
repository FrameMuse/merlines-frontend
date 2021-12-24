import AdminArticleEdit from "admin/components/AdminArticleEdit/AdminArticleEdit"
import AdminViewLayout from "admin/layouts/AdminViewLayout"
import { getBlogArticle } from "api/actions/blog"
import { useQuery } from "react-fetching-library"
import { ToastContainer } from "react-toastify"

function AdminEditArticleView(props: { articleId: string }) {
  return (
    <AdminViewLayout title="Добавить статью">
      <AdminArticleEditWithPreloadedData {...props} />
      <ToastContainer />
    </AdminViewLayout>
  )
}

function AdminArticleEditWithPreloadedData(props: { articleId: string }) {
  const { payload } = useQuery(getBlogArticle(props.articleId))
  if (!payload) return <>no content</>

  return (
    <AdminArticleEdit id={props.articleId} edit={payload} />
  )
}

export default AdminEditArticleView
