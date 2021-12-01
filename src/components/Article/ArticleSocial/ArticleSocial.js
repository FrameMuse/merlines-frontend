import ArticleSocialItem from './ArticleSocialItem';

function ArticleSocial() {
  const socialItemsConfig = [
    { name: 'vk', link: '#', svg: 'vkontakte', },
    { name: 'tg', link: '#', svg: 'telegram', },
    { name: 'fb', link: '#', svg: 'facebook', },
  ];

  return (
    <ul className="article__social">
      {socialItemsConfig.map((item, index) => <ArticleSocialItem key={index} socialItem={item} />)}
    </ul>
  )
};

export default ArticleSocial;
