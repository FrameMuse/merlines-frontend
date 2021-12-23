import AdminArticleEdit from "admin/components/AdminArticleEdit/AdminArticleEdit"
import AdminViewLayout from "admin/layouts/AdminViewLayout"
import { getAdminArticle } from "api/actions/admin"
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
  const { payload } = useQuery(getAdminArticle(props.articleId))

  useEffect(() => {
    if (!payload) return

    (async () => {
      const files = await Promise.all(payload.files.map(getFileFromURL))
      const preview = await getFileFromURL(payload.preview)

      setEditData({ ...payload, files, preview })
    })()

  }, [payload])

  if (!payload) return <>no content</>
  if (!editData) return <>no data</>

  return (
    <AdminArticleEdit edit={editData} />
  )
}

export default AdminEditArticleView
