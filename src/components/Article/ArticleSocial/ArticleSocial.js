import ArticleSocialItem from "./ArticleSocialItem"

function ArticleSocial() {
  const socialItemsConfig = [
    { name: "vk", link: "#", svg: "vkontakte" },
  ]

  return (
    <ul className="article__social">
      {socialItemsConfig.map((item, index) => (
        <ArticleSocialItem key={index} socialItem={item} />
      ))}
    </ul>
  )
}

export default ArticleSocial
