const polularScience = () =>
  import ('components/article/polularScience/polularScience')

const listPage = () =>
  import ('components/article/common-component/listPage')

const contentPage = () =>
  import ('components/article/common-component/contentPage')

export default [{
  path: '/polularScience',
  redirect: '/polularScience/polularScience/page/1'
}, {
  path: 'polularScience',
  name: 'polularScience',
  component: polularScience,
  children: [{
    path: '/polularScience/polularScience',
    redirect: '/polularScience/polularScience/page/1'
  }, {
    path: '/polularScience/polularScience/page',
    redirect: '/polularScience/polularScience/page/1'
  }, {
    path: '/polularScience/polularScience/content',
    redirect: '/polularScience/polularScience/page/1'
  }, {
    path: 'page/:page',
    name: 'polularScience_polularScience_page',
    component: listPage
  }, {
    path: 'content/:id',
    name: 'polularScience_polularScience_content',
    component: contentPage
  }]
}]