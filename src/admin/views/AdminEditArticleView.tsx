import AdminArticleEdit from "admin/components/AdminArticleEdit/AdminArticleEdit"
import AdminViewLayout from "admin/layouts/AdminViewLayout"
import { getBlogArticle } from "api/actions/blog"
import { useEffect, useState } from "react"
import { useQuery } from "react-fetching-library"
import { ToastContainer } from "react-toastify"
import { getFileFromURL } from "utils"

import { EditArticleType } from "../components/AdminArticleEditor/AdminArticleEditor"

function AdminEditArticleView(props: { articleId: string }) {
  return (
    <AdminViewLayout title="Добавить статью">
      <AdminArticleEditWithPreloadedData {...props} />
      <ToastContainer />
    </AdminViewLayout>
  )
}

function AdminArticleEditWithPreloadedData(props: { articleId: string }) {
  const [editData, setEditData] = useState<EditArticleType | null>(null)
  const { payload } = useQuery(getBlogArticle(props.articleId))

  useEffect(() => {
    if (!payload) return

    (async () => {
      const preview = await getFileFromURL(payload.preview)
      if (!preview) return

      setEditData({
        ...payload,
        files: [preview],
        preview
      })
    })()

  }, [payload])

  if (!payload) return <>no content</>
  if (!editData) return <>no data</>

  return (
    <AdminArticleEdit edit={editData} />
  )
}

export default AdminEditArticleView
