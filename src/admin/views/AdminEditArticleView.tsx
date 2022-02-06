import AdminArticleEdit from "admin/components/AdminArticleEdit/AdminArticleEdit"
import AdminViewLayout from "admin/layouts/AdminViewLayout"
import { getAdminArticle } from "api/actions/admin"
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
  const { payload } = useQuery(getAdminArticle(props.articleId))
  if (!payload) return <>no content</>

  // Pick
  const editData = {
    title: payload.title,
    content: payload.content,
    files: payload.files,
    preview: payload.preview,
    tags: payload.tags,
    is_draft: payload.is_draft
  }

  return (
    <AdminArticleEdit id={props.articleId} edit={editData} author={payload.author} />
  )
}

export default AdminEditArticleView
