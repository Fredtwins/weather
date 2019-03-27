const open = () =>
  import ('components/article/sunGovernmentAffairs/open')

const workService = () =>
  import ('components/article/sunGovernmentAffairs/workService')

const communion = () =>
  import ('components/article/sunGovernmentAffairs/communion/index')

const communionSuggestion = () =>
  import ('components/article/sunGovernmentAffairs/communion/suggestion')

const communionResearch = () =>
  import ('components/article/sunGovernmentAffairs/communion/research')

const notice = () =>
  import ('components/article/sunGovernmentAffairs/notice')

const news = () =>
  import ('components/article/sunGovernmentAffairs/news')

const ideasBox = () =>
  import ('components/article/sunGovernmentAffairs/ideasBox')

const listPage = () =>
  import ('components/article/common-component/listPage')

const contentPage = () =>
  import ('components/article/common-component/contentPage')

export default [{
    path: '/sunGovernmentAffairs',
    redirect: '/sunGovernmentAffairs/open'
  },
  {
    path: 'open/:current',
    name: 'open',
    component: open,
    children: [{
      path: '/sunGovernmentAffairs/open',
      redirect: '/sunGovernmentAffairs/open/responsibility/page/1'
    }, {
      path: '/sunGovernmentAffairs/open/:current',
      redirect: '/sunGovernmentAffairs/open/:current/page/1'
    }, {
      path: '/sunGovernmentAffairs/open/:current/page',
      redirect: '/sunGovernmentAffairs/open/:current/page/1'
    }, {
      path: '/sunGovernmentAffairs/open/:current/content',
      redirect: '/sunGovernmentAffairs/open/:current/page/1'
    }, {
      path: 'page/:page',
      name: 'sunGovernmentAffairs_open_page',
      component: listPage
    }, {
      path: 'content/:id',
      name: 'sunGovernmentAffairs_open_content',
      component: contentPage
    }]
  }, {
    path: 'workService',
    name: 'workService',
    component: workService,
    children: [{
      path: '/sunGovernmentAffairs/workService/content',
      redirect: '/sunGovernmentAffairs/workService'
    }, {
      path: 'content/:id',
      name: 'sunGovernmentAffairs_workService_content',
      component: contentPage
    }]
  }, {
    path: 'communion',
    name: 'communion',
    component: communion,
    children: [{
      path: '/sunGovernmentAffairs/communion',
      redirect: '/sunGovernmentAffairs/communion/suggestion/1'
    }, {
      path: 'research',
      name: 'sunGovernmentAffairs_communion_research',
      component: communionResearch,
      children: [{
        path: '/sunGovernmentAffairs/communion/research',
        redirect: '/sunGovernmentAffairs/communion/research/page/1'
      }, {
        path: '/sunGovernmentAffairs/communion/research/page',
        redirect: '/sunGovernmentAffairs/communion/research/page/1'
      }, {
        path: '/sunGovernmentAffairs/communion/research/content',
        redirect: '/sunGovernmentAffairs/communion/research/page/1'
      }, {
        path: 'page/:page',
        name: 'sunGovernmentAffairs_communion_research_page',
        component: listPage
      }, {
        path: 'content/:id',
        name: 'sunGovernmentAffairs_communion_research_content',
        component: contentPage
      }]
    }, {
      path: 'suggestion/:page',
      name: 'sunGovernmentAffairs_communion_suggestion',
      component: communionSuggestion,
      children: [{
        path: '/sunGovernmentAffairs/communion/suggestion',
        redirect: '/sunGovernmentAffairs/communion/suggestion/1'
      }, {
        path: '/sunGovernmentAffairs/communion/suggestion/page',
        redirect: '/sunGovernmentAffairs/communion/suggestion/1'
      }]
    }]
  }, {
    path: 'notice',
    name: 'notice',
    component: notice,
    children: [{
      path: '/sunGovernmentAffairs/notice',
      redirect: '/sunGovernmentAffairs/notice/page/1'
    }, {
      path: '/sunGovernmentAffairs/notice/page',
      redirect: '/sunGovernmentAffairs/notice/page/1'
    }, {
      path: '/sunGovernmentAffairs/notice/content',
      redirect: '/sunGovernmentAffairs/notice/page/1'
    }, {
      path: 'page/:page',
      name: 'sunGovernmentAffairs_notice_page',
      component: listPage
    }, {
      path: 'content/:id',
      name: 'sunGovernmentAffairs_notice_content',
      component: contentPage
    }]
  }, {
    path: 'news',
    name: 'news',
    component: news,
    children: [{
      path: '/sunGovernmentAffairs/news',
      redirect: '/sunGovernmentAffairs/news/page/1'
    }, {
      path: '/sunGovernmentAffairs/news/page',
      redirect: '/sunGovernmentAffairs/news/page/1'
    }, {
      path: '/sunGovernmentAffairs/news/content',
      redirect: '/sunGovernmentAffairs/news/page/1'
    }, {
      path: 'page/:page',
      name: 'sunGovernmentAffairs_news_page',
      component: listPage
    }, {
      path: 'content/:id',
      name: 'sunGovernmentAffairs_news_content',
      component: contentPage
    }]
  }, {
    path: 'ideasBox',
    name: 'ideasBox',
    component: ideasBox
  }
]
