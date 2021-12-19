import "./AdminAddArticle.style.scss"

import { postAdminArticle } from "api/actions/admin"
import ClientAPI from "api/client"
import ArticlePicture from "components/Article/ArticleFigure"
import ArticleSocial from "components/Article/ArticleSocial/ArticleSocial"
import ArticleTag from "components/Article/ArticleTag"
import { useState } from "react"
import ReactMarkdown from "react-markdown"
import { useHistory } from "react-router-dom"
import { classWithModifiers, isImageFile, toBase64 } from "utils"

import AdminButton from "../AdminButton/AdminButton"
import AdminArticleEditor, { EditArticleType } from "../AdminEditArticle/AdminEditArticle"

const sampleArticleData: EditArticleType = {
  title: "10 мест Парижа для хорошего отдыха на выходных",
  tags: [
    "ПОДБОРКИ",
    "ГАЙДЫ",
    "СОВЕТЫ",
    "ГИД",
    "ВДОХНОВЕНИЯ",
    "СОБЫТИЯ",
    "FAQ"
  ],
  content: "![Автор фото - Александ Перов](/images/article/3.jpg)## Музей Лувр\n\nСмотрели фильм «Бельфегор – призрак Лувра?». Хотите побывать там, где проводились его съемки со знаменитыми, может даже вашими любимыми актерами? Где летали призраки и передвигались мумии? Тогда вам прямая дорога в Лувр – один из самых древних музеев мира. Каждый год его посещают от 7 до 10 миллионов человек.\n\n![Автор фото - Александ Перов](/images/article/2.jpg)\n\nИстория музея началась в 16 веке. Именно в это время на правом берегу реки Сены был возведен замок. Спустя много лет его реконструировали и на его месте «вырос» дворец, а еще спустя годы – в восемнадцатом веке, было принято решение о переоборудовании дворца в музей. На экскурсии гиды обязательно ознакомят вас с богатой историей этого сооружения, вы останетесь под впечатлением!\n\n## Эйфелева башня\n\nНу кто не знает об этой удивительной конструкции? Наверняка о знаменитой башне знают все! Такого чуда вы не найдете в других городах мира. Высота башни — более трехсот метров!\n\n![Автор фото - Александ Перов](/images/article/3.jpg)\n\nС такой высоты открывается вид на весь город, причем даже довольно высокие здания кажутся двухэтажными домиками. На башне есть специальная смотровая площадка куда пускают туристов. Вы можете фотографироваться на память и делать снимки города.\n\nНе многие знают, что башни могло и не быть, поскольку конструкция создавалась на определенное время. Спасло ее от сноса только то, что вовремя наступила эпоха радиовещания. На башне были установлены антенны, принимающие радиосигналы.\n\n## Собор Парижской Богоматери (Нотр-Дам-де-Пари)\n\nСобор бьет рекорды по посещаемости год от года. Туристов привлекает это место неспроста. Как внутри, так и снаружи собора очень красиво. Напротив здания есть трибуна.\n\n![Автор фото - Александ Перов](/images/article/4.jpg)\n\nС такой высоты открывается вид на весь город, причем даже довольно высокие здания кажутся двухэтажными домиками. На башне есть специальная смотровая площадка куда пускают туристов. Вы можете фотографироваться на память и делать снимки города.\n\nТак же для посещения мы рекомендуем:\n\n- Триумфальная арка\n- Елисейские поля\n- Дворец Версаль\n\nЭто далеко не все достопримечательности Парижа, но мы обязательно расскажем о других в следующей серии статей. Все представленные места ежегодно посещают миллионы туристов и это неспроста. Не останьтесь в стороне и вы! Подарите себе и своим детям массу положительных впечатлений и эмоций.\n",
  files: [],
  preview: null
}

const date = (new Date).toISOString()

function AdminAddArticle() {
  const history = useHistory()

  const [articleData, setArticleData] = useState<EditArticleType>(sampleArticleData)
  const [showPreview, setShowPreview] = useState(false)

  async function addArticle() {
    const files: Record<string, ArrayBuffer> = {}
    const preview = articleData.preview?.name

    if (!preview) {
      alert("Выберите превью")
      return
    }

    for (const file of articleData.files) {
      files[file.name] = await toBase64(file)
    }

    const { error, payload } = await ClientAPI.query(postAdminArticle({ ...articleData, files, preview }))
    if (error || !payload || payload.error) return

    history.push("/blog/article/" + payload.id)
  }

  return (
    <div className={classWithModifiers("add-article", showPreview && "preview")}>
      <div className="add-article__topbar">
        <AdminButton
          onClick={() => setShowPreview(!showPreview)}
          color={showPreview ? "gray" : undefined}
          children={showPreview ? "Disable preview mode" : "Enable preview modei"}
        />
      </div>
      {!showPreview && (
        <AdminArticleEditor {...sampleArticleData} onChange={data => setArticleData({ ...articleData, ...data })} />
      )}
      {/* TODO: Replace with existed component */}
      {showPreview && (
        <section className="article-page">
          <div className="article-page__container">
            <article className="article">
              <ArticleSocial />
              <div className="article-card article-card--header">
                <ul className="article-card__tags-list">
                  {articleData.tags.map((tag, index) => (
                    <ArticleTag key={index} tag={tag} />
                  ))}
                </ul>
                <h2 className="article-card__title">{articleData.title}</h2>
                <time className="article-card__date" dateTime={date}>{date}</time>
              </div>
              <ReactMarkdown components={{ img: props => <ArticlePicture src={props.src} caption={props.alt} /> }}>
                {articleData.files.filter(isImageFile).reduce((result, nextFile) => result.replace(nextFile.name, URL.createObjectURL(nextFile)), articleData.content)}
              </ReactMarkdown>
            </article>
          </div>
        </section>
      )}
      <div>
        <AdminButton onClick={addArticle}>Опубликовать новую статью</AdminButton>
      </div>
    </div>
  )
}

export default AdminAddArticle
