import "./AdminArticleSearch.scss"

import AdminSectionLayout from "admin/layouts/AdminSectionLayout"
import { deleteAdminArticle, getAdminArticles, patchAdminArticle } from "api/actions/admin"
import SimpleTable from "components/SimpleTable/SimpleTable"
import { OrderingType } from "interfaces/Django"
import { useEffect, useState } from "react"
import { useClient, useQuery } from "react-fetching-library"
import { useHistory } from "react-router-dom"

import AdminButton from "../AdminButton/AdminButton"
import { AdminArticleType } from "../AdminEditTags/AdminEditTags"
import { mapAdminArticle } from "./AdminArticleSearch.helpers"

const thead = {
  id: "ID",
  title: "Заголовок",
  author_name: "Автор",
  created_at: "Дата создания",
  comments_count: "Комментарии",
  is_draft: "Статус"
} as const

interface AdminArticleSearchProps {
  filters: Partial<{
    tags__contains: string
  }>
}

function AdminArticleSearch(props: AdminArticleSearchProps) {
  const client = useClient()
  const history = useHistory()

  const [search, setSearch] = useState("")
  const [sortedBy, setSortedBy] = useState<OrderingType<keyof typeof thead>>("id")
  const [selected, setSelected] = useState(-1)


  const [page, setPage] = useState(1)
  const [pageSize] = useState(35)
  const { error, loading, payload } = useQuery(getAdminArticles(page, pageSize, { ...props.filters, title__icontains: search, ordering: sortedBy }))

  if (error) throw new Error("AdminArticleSearch")
  if (!loading && payload == null) throw new Error("no payload")

  const [results, setResults] = useState<AdminArticleType[]>([])
  useEffect(() => payload?.results && setResults(payload.results), [payload?.results])


  function updateArticleById<K extends keyof AdminArticleType>(id: number, key: K, value: AdminArticleType[K]) {
    setResults(results => {
      const result = results.find(result => result.id === id)
      if (result) result[key] = value
      return [...results]
    })
  }

  async function patchArticleDraft(id: number | undefined, value: boolean) {
    if (id == null) return

    const { error } = await client.query(patchAdminArticle(id, {}, value))
    if (error) return

    updateArticleById(id, "is_draft", value)
  }

  async function deleteArticle(id?: number) {
    if (id == null) return

    const { error } = await client.query(deleteAdminArticle(id))
    if (error) return

    setResults(results => results.filter(result => result.id !== id))
  }

  const selectedArticle = payload?.results[selected]
  return (
    <AdminSectionLayout header={payload?.count + " Статей"}>
      <div className="admin-article-search">
        <div className="admin-article-search__search">
          <input className="admin-article-search__input" placeholder="Введите текст для поиска" value={search} onChange={event => setSearch(event.currentTarget.value)} />
          {/* <AdminButton>Поиск</AdminButton> */}
        </div>
        <div className="admin-article-search__buttons">
          <AdminButton onClick={() => history.push("/admin/add-article")}>Добавить статью</AdminButton>
          <AdminButton disabled={selected === -1} onClick={() => history.push("/admin/edit-article/" + selectedArticle?.id)}>Редактировать статью</AdminButton>
          <AdminButton disabled={selected === -1} onClick={() => patchArticleDraft(selectedArticle?.id, false)}>Опубликовать статью</AdminButton>
          <AdminButton disabled={selected === -1} onClick={() => patchArticleDraft(selectedArticle?.id, true)}>Снять с публикации</AdminButton>
          <AdminButton disabled={selected === -1} onClick={() => deleteArticle(selectedArticle?.id)}>Удалить статью</AdminButton>
        </div>
        {payload && (
          <SimpleTable
            head={thead}
            body={results.map(result => Object.values(mapAdminArticle(result)))}

            sort={sortedBy}
            onSort={setSortedBy}
            onSelect={setSelected}
          />
        )}
        <div className="admin-article-search__buttons">
          <AdminButton disabled={page === 1} onClick={() => setPage(page - 1)}>Назад</AdminButton>
          <AdminButton disabled={(page * pageSize) >= (payload?.count ?? 0)} onClick={() => setPage(page + 1)}>Вперёд</AdminButton>
        </div>
      </div>
    </AdminSectionLayout>
  )
}

export default AdminArticleSearch