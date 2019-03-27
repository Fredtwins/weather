const search = () =>
  import ('components/article/search/search')

const listPage = () =>
  import ('components/article/common-component/listPage')

const contentPage = () =>
  import ('components/article/common-component/contentPage')

export default [{
  path: '/search',
  redirect: '/search/search/page/1'
}, {
  path: 'search',
  name: 'search',
  component: search,
  children: [{
    path: '/search/search',
    redirect: '/search/search/page/1'
  }, {
    path: '/search/search/page',
    redirect: '/search/search/page/1'
  }, {
    path: '/search/search/content',
    redirect: '/search/search/page/1'
  }, {
    path: 'page/:page',
    name: 'search_search_page',
    component: listPage
  }, {
    path: 'content/:id',
    name: 'search_search_content',
    component: contentPage
  }]
}]
