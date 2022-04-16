import AdminArticleSearch from "admin/components/AdminArticleSearch/AdminArticleSearch"
import AdminEditTags from "admin/components/AdminEditTags/AdminEditTags"
import AdminViewLayout from "admin/layouts/AdminViewLayout"
import { BlogTagType } from "interfaces/Blog"
import { useState } from "react"
import { ToastContainer } from "react-toastify"

function AdminBlogView() {
  const [selectedTag, setSelectedTag] = useState<BlogTagType | null>(null)
  return (
    <AdminViewLayout title="Блог">
      <AdminEditTags selected={selectedTag} onSelect={setSelectedTag} />
      <AdminArticleSearch filters={{ tags__contains: selectedTag?.title }} />
      <ToastContainer />
    </AdminViewLayout>
  )
}

export default AdminBlogView
