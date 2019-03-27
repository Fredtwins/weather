const organizationSynopsis = () =>
  import ('components/article/tornadoResearch/organizationSynopsis')

const scienceInformation = () =>
  import ('components/article/tornadoResearch/scienceInformation')

const listPage = () =>
  import ('components/article/common-component/listPage')

const contentPage = () =>
  import ('components/article/common-component/contentPage')

export default [
  {
    path: '/tornadoResearch',
    redirect: '/tornadoResearch/organizationSynopsis'
  }, {
    path: 'organizationSynopsis',
    name: 'organizationSynopsis',
    component: organizationSynopsis
  }, {
    path: 'scienceInformation',
    name: 'scienceInformation',
    component: scienceInformation,
    children: [{
      path: '/tornadoResearch/scienceInformation',
      redirect: '/tornadoResearch/scienceInformation/page/1'
    }, {
      path: '/tornadoResearch/scienceInformation/page',
      redirect: '/tornadoResearch/scienceInformation/page/1'
    }, {
      path: '/tornadoResearch/scienceInformation/content',
      redirect: '/tornadoResearch/scienceInformation/page/1'
    }, {
      path: 'page/:page',
      name: 'tornadoResearch_scienceInformation_page',
      component: listPage
    }, {
      path: 'content/:id',
      name: 'tornadoResearch_scienceInformation_content',
      component: contentPage
    }]
  }
]
