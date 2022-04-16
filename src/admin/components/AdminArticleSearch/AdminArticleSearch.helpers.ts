import { humanizeDate } from "components/SearchForm/SearchForm.utils"
import _ from "lodash"

import { AdminArticleType } from "../AdminEditTags/AdminEditTags"

export function mapAdminArticle(payload: AdminArticleType) {
  return {
    ..._.omit(payload, "is_draft", "deleted_comments_count"),
    author: payload.author.first_name + " " + payload.author.last_name,
    status: payload.is_draft ? "Черновик" : "Опубликовано",
    created_at: new Date(payload.created_at).toLocaleString("ru", { year: "numeric" }) + ", " + humanizeDate(new Date(payload.created_at))
  }
}
